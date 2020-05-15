
import express, {Application, Request, Response} from 'express';
import bodyparser from 'body-parser';
import {usersRouter} from './Routers/usersRouter';
import {loginRouter} from './Routers/loginRouter';
import {reimbursementsRouter} from './Routers/reimbursementsRouter';
import {authRoleFactory} from './Middleware/authMiddleware';


const PORT : number = 8864;
const app: Application = express();
app.use(bodyparser.json());
app.use(authRoleFactory);


app.use(usersRouter);
app.use(loginRouter);
app.use(reimbursementsRouter);


app.listen(8864, () => {console.log("listening on http://localhost: ${PORT}");});

