import HTTP_CODES from "../../utils/httpCodes.mjs";

// Opprett deck-objektet
const decks = {};
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

//-------------------------
// Funksjon for å opprette et ny kortstokk
//-------------------------
export const MakeDeck = (req, res, next) => {
    const deck_id = Math.random().toString(36).substring(2, 8);
    const cards = [];

    for (const suit of suits) {
        for (const value of values) {
            cards.push({ suit, value });
        }
    }

    decks[deck_id] = { cards, drawn: [] };
    res.status(HTTP_CODES.SUCCESS.OK).send(`The deck ID is: ${deck_id}`).end();
};

//-------------------------
// Shuffle deck
//-------------------------

//Funksjon for å stokke kortstokkne
const shuffle = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

export const ShuffleDeck = (req, res, next) => {
    const { deck_id } = req.params; 
    const deck = decks[deck_id];

    if (!decks[deck_id]) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send(`Deck ID ${deck_id} not found`).end();
    }


    deck.cards = shuffle(deck.cards);

    res.status(HTTP_CODES.SUCCESS.OK).send(`Deck ${deck_id} has been shuffled!`).end();
};

//-------------------------
//Hente hele kortstokken
//-------------------------
export const ShowDeck = (req, res, next) => {
    const { deck_id } = req.params; 
    const deck = decks[deck_id];
    if (!decks[deck_id]) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send(`Deck not found`).end();
    }

    res.status(HTTP_CODES.SUCCESS.OK).send(deck.cards).end();
}

//-------------------------
//Trekke kort fra dekket
//-------------------------
export const DrawCard = (req, res, next) =>{
    const { deck_id } = req.params; 
    const deck = decks[deck_id];
    if (!decks[deck_id]) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send(`Deck not found`).end();
    }
    if (deck.cards.length === 0) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('No cards left in the deck').end();
    }

    const card = deck.cards.pop();
    deck.drawn.push(card);
    res.status(HTTP_CODES.SUCCESS.OK).send(card).end()
}

