import HTTP_CODES from "../../server/utils/httpCodes.mjs";

console.log(HTTP_CODES);  

// Opprett deck-objektet
const decks = {};
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const suitSymbols = {
    clubs: '♣',
    diamonds: '♦',
    hearts: '♥',
    spades: '♠'
};
const formatCard = ({ suit, value }) => {
    const suitSymbol = suitSymbols[suit.toLowerCase()]; 
    return `${value} ${suitSymbol}`; 
};

const formatDeck = (deck) => {
    return deck.map((card, index) => {
        // Validate card properties
        if (!card.value || !card.suit) {
            console.error(`Card at index ${index} is missing value or suit:`, card);
            return `Invalid Card`;
        }

        // Normalize suit case to lowercase
        const suitSymbol = suitSymbols[card.suit.toLowerCase()];
        if (!suitSymbol) {
            console.error(`Card at index ${index} has an unrecognized suit:`, card.suit);
            return `${card.value} UnknownSuit`;
        }

        return `${card.value} ${suitSymbol}`;
    });
};

//-------------------------
// Funksjon for å opprette et ny kortstokk
//-------------------------
export const MakeDeck = (req, res, next) => {
        

        // Sanity check for `res` and `req`
        if (!res) {
            throw new Error('Response object not found.');
        }
        const deck_id = Math.random().toString(36).substring(2, 8);
    const cards = [];

    for (const suit of suits) {
        for (const value of values) {
            cards.push({ suit, value });
        }
    }

    decks[deck_id] = { cards, drawn: [] };
    res.status(HTTP_CODES.SUCCESS.OK).json({ deck_id });
    
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




export const ShuffleDeck = (req, res) => {
    const { deck_id } = req.params;

    if (!decks[deck_id]) {
        console.error(`Deck ID ${deck_id} not found`);
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: `Deck ID ${deck_id} not found` });
    }

    const deck = decks[deck_id];
        deck.cards = shuffle(deck.cards);
        const formattedDeck = formatDeck(deck.cards);

        return res.status(HTTP_CODES.SUCCESS.OK).json({
            message: `Deck ${deck_id} has been shuffled!`,
        });
    
};

    



//-------------------------
//Hente hele kortstokken
//-------------------------
export const ShowDeck = (req, res) => {
    const { deck_id } = req.params;
    const deck = decks[deck_id];

    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck not found');
    }

    const formattedDeck = formatDeck(deck.cards);
    return res.status(HTTP_CODES.SUCCESS.OK).json({
        message: `Deck ${deck_id} contents`,
        cards: formattedDeck
    });
};



//-------------------------
//Trekke kort fra dekket
//-------------------------
export const DrawCard = (req, res, next) =>{
    const { deck_id } = req.params; 
    const deck = decks[deck_id];
    if (!decks[deck_id]) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json(`Deck not found`);
    }
    if (deck.cards.length === 0) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json('No cards left in the deck');
    }

    const card = deck.cards.pop();
    const formattedCard = formatCard(card);
    deck.drawn.push(card);
    res.status(HTTP_CODES.SUCCESS.OK).json(formattedCard)
}

