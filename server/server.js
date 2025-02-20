import express from 'express'
import cookieParser from 'cookie-parser'
import HTTP_CODES from './utils/httpCodes.mjs';
import { randomquote } from '../code/uke3/quote.mjs';
import { poem } from '../code/uke3/poem.mjs';
import { ListSum } from '../code/uke3/sum.mjs';
import { MakeDeck, ShuffleDeck, ShowDeck, DrawCard } from '../code/uke4/kort.mjs';
import log from '../modules/log.mjs';
import { LOGG_LEVELS } from '../modules/log.mjs';
import abTest from '../modules/abtesting.mjs';
import { startSession, updateSession } from '../modules/session.mjs';
import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';



const server = express();
const port = (process.env.PORT || 8000);
const logger = log(LOGG_LEVELS.VERBOSE);


server.set('port', port);
server.use(cookieParser())
server.use(logger);
server.use(abTest)
server.use(startSession);
server.use(express.static('public'));
server.use("/tree/", treeRouter);
server.use("/quest", questLogRouter);
server.use("/user", userRouter)

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
server.post('/tmp/deck', MakeDeck);
   
//--------Stokk Kortstokken------
// Ensure that you handle the shuffle route correctly
server.patch('/tmp/deck/shuffle/:deck_id', ShuffleDeck);

//-----Returnerer kortstokken----
server.get('/tmp/deck/:deck_id', ShowDeck);

//--Vis tilfeldig kort fra bunken--
server.get('/tmp/deck/:deck_id/card', DrawCard);

//--------------------------------
//UKE 6
//--------------------------------
server.get('/tmp/experiment', (req, res) => {
    if (req.abTestVariant === 'A') {
        res.json({ message: "Variant A - Standard UI" });
    } else {
        res.json({ message: "Variant B - Ny UI med forbedringer" });
    }
});

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});