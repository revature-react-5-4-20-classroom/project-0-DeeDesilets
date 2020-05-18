import express, { Router, Request, Response, NextFunction } from 'express';
import  User  from '../models/User';
import { getAllUsers, /*addNewUser, */updateUser, getUserByID} from '../repository/user-data-access';

export const usersRouter: Router = express.Router();


usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {

  console.log('made it to usersRouter, get@/users');

  if (req.session && req.session.role === 'finance manager')   {
      try {
    console.log('hi from inside try block on usersRouter');
          
      res.json(getAllUsers());
      }
        
       catch (e) {
    console.log("caught error on usersRouter");
        next(e);
    
      }
  } else {
        
    res.sendStatus(401).send('The incoming token has expired.');
    }
  })

usersRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {

  console.log('made it to usersRouter, get@/users');

  const id = +req.params.id;

  if(isNaN(id)) {

    res.status(400).send('Must include numeric id in path');

} else if ((req.session && req.session.user.role === 'finance manager') || (req.session && req.session.user.userId === id)) {
      try {
      console.log('hi from inside try block on usersRouter');
        res.json(getUserByID(id));
      }
      catch (e) {
      console.log("caught error on usersRouter");
        next(e);
    
      } }else {res.sendStatus(401).send('The incoming token has expired.');}
    })
  



usersRouter.patch('/users', async (req: Request, res: Response) => {
  console.log('hi from usersRouter');
    let {userId, username, password, firstName, lastName, email, role} = req.body;
  console.log('hi from before if');
  console.log(`${userId}, ${username}, ${password}, ${firstName}, ${lastName}, ${email}, ${role}`);
    if(userId && username && password && firstName && lastName && email && role) {
  console.log('hi from inside if');
      if (await updateUser(userId, username, password, firstName, lastName, email, role)) {
  
      res.sendStatus(201);
  
    } else {
  
      res.sendStatus(400).send('Please include required fields.');
  
    }
  }
 })


/*usersRouter.post('/users', async (req: Request, res: Response) => {
console.log('hi from usersRouter');
  let {userId, username, password, firstName, lastName, email, role} = req.body;
console.log('hi from before if');
console.log(`${userId}, ${username}, ${password}, ${firstName}, ${lastName}, ${email}, ${role}`);
  if(userId && username && password && firstName && lastName && email && role) {
console.log('hi from inside if');
    await addNewUser(new User(userId, username, password, firstName, lastName, email, role));

    res.sendStatus(201);

  } else {

    res.status(400).send('Please include required fields.');

  }

})*/



