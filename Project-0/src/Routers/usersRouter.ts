import express, {Router, Request, Response} from 'express';
import {authRoleFactory} from '../Middleware/authMiddleware';
import {users} from '../temp-database';
import User from '../models/User';
import session from 'express-session';

export const usersRouter : Router = express.Router();

usersRouter.get('/users', (req: Request, res: Response) => {
  
  if(!req.session || !req.session.user) {

    res.status(401).send('Please login');
    
  } else if (authRoleFactory(['finance-manager'])) {
    
        res.json(users);
  }
    else {
        console.log("The incoming token has expired");
};})

function getUserById(id: number): User {

  return users.filter((user) => {

    user.userId === id;

})[0];

}

usersRouter.get('/users/:id', (req : Request, res : Response) => {
  
  
    const id = +req.params.id; 
  
    if(isNaN(id)) {
  
      res.status(400).send('Must include numeric id in path');
  
    } else if (authRoleFactory(['finance manager']) && req.session.Userid === id){
  
      res.json(getUserById(id));
  
    };
  
  
});

usersRouter.patch('/users', (req : Request, res : Response) => { 
  
  if(authRoleFactory(["admin"]) && req.body.user.userId) {

      let foundIt : User = (users.filter((id) => {id = req.body.user.userId}))[0];
      let {Id, userName, passWord, firstname, lastname, eMail, Role} = req.body;
      if (userName) {
        foundIt.username = userName; 
        }
      if (passWord){
        foundIt.password = passWord;
      }
      if (firstname){
        foundIt.firstName = firstname;
      }
      if (lastname){
        foundIt.lastName = lastname;
      }
      if (eMail){
        foundIt.email = eMail;
      }
      if (Role){
        foundIt.role = Role;
      }
      res.json(foundIt);
  }});
