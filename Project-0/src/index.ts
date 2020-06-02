
import express, {Application, Request, Response, NextFunction} from 'express';
import session from 'express-session';
import bodyparser from 'body-parser';
import {usersRouter} from './Routers/usersRouter';
import {loginRouter} from './Routers/loginRouter';
import {reimbursementsRouter} from './Routers/reimbursementsRouter';
import {PoolClient, QueryResult} from 'pg';
import dotenv from 'dotenv';
// This must go above connection pool or we won't have our environment variables
dotenv.config();
import {connectionPool} from './repository'
import {sessionMiddleware} from './Middleware/sessionMiddleware';
import {loggingMiddleware} from './Middleware/LoggingMiddleware';
import {corsFilter} from './Middleware/corsFilter';
 

const PORT : number = 6464;

const app: Application = express();
console.log('after App, before CORS');
app.use(corsFilter);
console.log ('after cors, before bodyparser');
app.use(bodyparser.json());
console.log('after bodyparser, before session');
app.use(sessionMiddleware);
console.log('after session, before logging');
app.use(loggingMiddleware);
console.log('after logging');
app.use('/login', loginRouter);
console.log('after login');
app.use('/users', usersRouter);
console.log('after users router');
app.use('/reimbursements', reimbursementsRouter);
console.log('after reimbursements router');

app.listen(6464, () => {
    console.log(`listening on http://3.81.26.224: ${PORT}, testing connection`);
    connectionPool.connect().then((client : PoolClient)=>{
        console.log(process.env.PG_DATABASE);
        console.log('connected');
        }).catch ((client : PoolClient) => {
            console.log("promise rejected");
        })
});

app.get('/newendpoint', (req: Request, res: Response) => {
    console.log("Webhook works!");
    res.json("Webhook works!");
})
/*This just tests i
ndex.ts at various points before more complicated functions are added back in

app.get('/users', (req:Request, res: Response) => {
    console.log("It's a start");
    res.json("hi, there!");
});

app.post('/users', (req:Request, res: Response) => {
    console.log("something posted at /users");
    res.status(201).send("Created");
});

app.post('/login', (req:Request, res: Response) => {
    console.log(req.body);
    
    res.status(201).send("Created");
});*/