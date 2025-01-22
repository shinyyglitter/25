import HTTP_CODES from "../../utils/httpCodes.mjs";

const decks = {};
const deck_id = Math.random().toString(36).substring(2,8);

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4','5','6','7','8','9','10','Jack','Queen', 'King','Ace'];

const cards = [];

for(const suit of suits){
    for(const value of values){
        cards.push({suit, value});
    }
}
decks[deck_id] = {cards, drawn:[]}

export const MakeDeck = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send({deck_id}).end();}