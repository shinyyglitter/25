import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));


//-----------Poem-----------
const poem = "<h2>Du må ikke sove - Arnulf Øverland</h2><br>"+"Jeg våknet en natt av en underlig drøm, <br>"+
" det var som en stemme talte til meg,<br>" +
 "fjern som en underjordisk strøm-,<br>"+
 " og jeg reiste meg opp: <br>"+
 "Hva er det du vil meg?,<br><br>"+
 "– Du må ikke sove! Du må ikke sove. <br>"+
 "Du må ikke tro at du bare har drømt,<br>"+
 "I går ble jeg dømt,<br>"+
 "I natt reiste de skafottet i gården,<br>"+
 "De henter meg klokken fem i morgen"

const listPoem = (req, res, next) => {res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();}
/**/

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

//---------Regne ut sum---------
const ListSum = (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Bad Request: 'a' og 'b' må være gyldige tall.");
    }
  
    const sum = a + b;
  
    res.status(HTTP_CODES.SUCCESS.OK).send(`Summen av ${a} og ${b} er ${sum}`);
  };

server.post('/tmp/sum/:a/:b', ListSum)
server.get('/tmp/sum/:a/:b', ListSum)

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});