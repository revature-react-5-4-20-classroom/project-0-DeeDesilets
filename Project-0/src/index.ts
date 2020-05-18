
import express, {Application, Request, Response, NextFunction} from 'express';
import session from 'express-session';
import bodyparser from 'body-parser';
import {usersRouter} from './Routers/usersRouter';
import {loginRouter} from './Routers/loginRouter';
import {reimbursementsRouter} from './Routers/reimbursementsRouter';
import { PoolClient, QueryResult } from 'pg';
import { connectionPool } from './repository'
import {sessionMiddleware} from './Middleware/sessionMiddleware';
import { loggingMiddleware } from './Middleware/LoggingMiddleware';
 

const PORT : number = 6464;

const app: Application = express();

app.use(bodyparser.json());
app.use(sessionMiddleware);
app.use(loggingMiddleware);

app.use('/login', loginRouter);

app.use('/users', usersRouter);

app.use('/reimbursements', reimbursementsRouter);


app.listen(6464, () => {
    console.log(`listening on http://localhost: ${PORT}, testing connection`);
    connectionPool.connect().then((client : PoolClient)=>{

        console.log('connected');
        }).catch ((client : PoolClient) => {
            console.log("promise rejected");
        })
});


/*This just tests index.ts at various points before more complicated functions are added back in

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