import HTTP_CODES from "../../utils/httpCodes.mjs";

// Opprett deck-objektet
const decks = {};
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Funksjon for å opprette et ny kortstokk
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

//Funksjon for å stokke kortstokkne
const shuffle = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

// Shuffle deck
export const ShuffleDeck = (req, res, next) => {
    const { deck_id } = req.params; 

    if (!decks[deck_id]) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send(`Deck ID ${deck_id} not found`).end();
    }

    
    const deck = decks[deck_id];
    deck.cards = shuffle(deck.cards);

    res.status(HTTP_CODES.SUCCESS.OK).send(`Deck ${deck_id} has been shuffled!`).end();
};


