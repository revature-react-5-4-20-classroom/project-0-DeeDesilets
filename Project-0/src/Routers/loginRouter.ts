import express, {Router, Request, Response} from 'express';

import {checkingCredentials} from '../repository/user-data-access'

export const loginRouter : Router = express.Router();



loginRouter.post('/', async (req: Request, res: Response) => {
  // assumes users login with username and password inside a JSON object
  
  const {username, password} = req.body;
  if( !username || !password) {
    res.status(400).send('Please include username and password fields for login');
  } else {
    try {
      console.log("inside try block on login router");
      const user = await checkingCredentials(username, password);
      if(user && req.session) {
        req.session.user = user;
        res.json(user);
      } else if (!user)
        res.status(400).send("Invalid Credentials");
    } catch (e) {
      console.log(e.message);
      res.status(400).send('Invalid Credentials');
    }

  }
});