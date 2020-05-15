import express, {Router, Request, Response} from 'express';
import { users } from '../temp-database';

export const loginRouter : Router = express.Router();


loginRouter.post('/login', (req: Request, res: Response) => {

  if ((users.filter((user) => {
    user.username === req.body.username && user.password === req.body.password})).length>0){
      console.log(users[0]);
      res.json(users[0]);
    } else {
        res.sendStatus(400).send('Invalid Credentials');  
       
      }
})