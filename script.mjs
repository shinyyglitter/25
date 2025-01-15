import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

const dikt = "Jeg våknet en natt av en underlig drøm, det var som en stemme talte til meg, fjern som en underjordisk strøm-, og jeg reiste meg opp: Hva er det du vil meg?,– Du må ikke sove! Du må ikke sove. Du må ikke tro at du bare har drømt, I går ble jeg dømt, I natt reiste de skafottet i gården, De henter meg klokken fem i morgen"

const listDikt = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(dikt).end();}
/*function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}*/

server.get("/", listDikt);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});