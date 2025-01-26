import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import { randomquote } from '../code/uke3/quote.mjs';
import { poem } from '../code/uke3/poem.mjs';
import { ListSum } from '../code/uke3/sum.mjs';
import { MakeDeck, ShuffleDeck, ShowDeck, DrawCard } from '../code/uke4/kort.mjs';



const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

//--------------------------------
//UKE 3
//--------------------------------

//-----------Poem-----------
const listPoem = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();}
server.get("/tmp/poem", listPoem);

//----------Quote--------------
const ListRandomQuote = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(randomquote).end();}
server.get("/tmp/quote", ListRandomQuote);

//---------Sum---------
server.post('/tmp/sum/:a/:b', ListSum);


//--------------------------------
//UKE 4
//--------------------------------

//---------Oprett kortstokk------

server.post('/tmp/deck', (req, res) => {
    try {
        const { deck_id, cards } = MakeDeck();
        res.status(HTTP_CODES.SUCCESS.OK).json({ message: `The deck ID is: ${deck_id}`, cards });
    } catch (error) {
        console.error('Error creating deck:', error);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL).json({ error: error.message });
    }
});
   




//--------Stokk Kortstokken------
server.patch('/tmp/deck/shuffle/:deck_id', ShuffleDeck);

//-----Returnerer kortstokken----
server.get('/tmp/deck/:deck_id', ShowDeck);

//--Vis tilfeldig kort fra bunken--
server.get('/tmp/deck/:deck_id/card', DrawCard);



server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});