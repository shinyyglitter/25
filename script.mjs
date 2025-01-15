import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
//-----------Poem-----------
const poem = "Jeg våknet en natt av en underlig drøm, det var som en stemme talte til meg, fjern som en underjordisk strøm-, og jeg reiste meg opp: Hva er det du vil meg?,– Du må ikke sove! Du må ikke sove. Du må ikke tro at du bare har drømt, I går ble jeg dømt, I natt reiste de skafottet i gården, De henter meg klokken fem i morgen"

const listPoem = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();}
/*function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}*/

server.get("/tmp/poem", listPoem);

//----------Quote--------------

const quote = ["A hug is always the right size - Winnie The Pooh", 
    "After all, one can't complain. I have my friends. - Eeyore", 
    "The things that make me different are the things that make me, me. -Piglet",
    "Sometimes the smallest things take up the most room in your heart. -Winnie The Pooh", 
    "People say nothing is impossible, but I do nothing every day. -Winnie the Pooh", 
    "Any day spent with you is my favorite day. So, today is my new favorite day.—Winnie the Pooh"]

const getRandomQuote = Math.floor(Math.random()*quote.length);

let randomquote = quote[getRandomQuote];

const ListRandomQuote = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(randomquote).end();}

server.get("/tmp/quote", ListRandomQuote)

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});