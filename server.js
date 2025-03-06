import express from 'express'
import cookieParser from 'cookie-parser'
import HTTP_CODES from './utils/httpCodes.mjs';

import log from './modules/log.mjs';
import { LOGG_LEVELS } from './modules/log.mjs';
import abTest from './modules/abtesting.mjs';
import { startSession, updateSession } from './modules/session.mjs';
import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';
import graphRouter from './routes/graphAPI.mjs';



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
server.use("/graph/", graphRouter);
server.use("/quest", questLogRouter);
server.use("/user", userRouter);



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