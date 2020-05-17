import express, {Router, Request, Response, request} from 'express';
import Reimbursement from '../models/Reimbursement';
import {authRoleFactory} from '../Middleware/authMiddleware';
import session from 'express-session';
//import {getReimbursementsById} from '../repository/user-data-access'

export const reimbursementsRouter : Router = express.Router();

/*/reimbursementsRouter.post('/reimbursements', (req : Request, res : Response) => {
  
    let {id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = req.body;
  
    if(id && author && amount && dateSubmitted && dateResolved && description && resolver && status && type) {
  
      let reimbursement : Reimbursement = new Reimbursement(0, author, amount, dateSubmitted, dateResolved, description, resolver, status, type);
      reimbursements.push(reimbursement);
      res.status(201).send('Created.');
      res.json(reimbursement);
      } else {
     
       res.status(400).send('Please include required fields.');
  
      }
  });


reimbursementsRouter.patch('/reimbursements', (req : Request, res : Response) => { 
  
  if(authRoleFactory(["finance manager"]) && req.body.reimbursement.reimbursementId) {
  
        let foundIt : Reimbursement = (reimbursements.filter((id) => {id = req.body.reimbursements.reimbursementId}))[0];
        let {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = req.body;
        if (author) {
          foundIt.author = author; 
          }
        if (amount){
          foundIt.amount = amount;
        }
        if (dateSubmitted){
          foundIt.dateSubmitted = dateSubmitted;
        }
        if (dateResolved){
          foundIt.dateResolved = dateResolved;
        }
        if (description){
          foundIt.description = description;
        }
        if (resolver){
          foundIt.resolver = resolver;
        }
        if (status){
          foundIt.status = status;
        }
        if (type){
          foundIt.type = type;
        }
        res.json(foundIt);
    }});

    


reimbursementsRouter.get('/reimbursements/status/:statusId', (req : Request, res : Response) => {
    
    const id = +req.params.id; 
  
    if(isNaN(id)) {
  
      res.status(400).send('Must include numeric id in path');
  
    } else {
      
      if (authRoleFactory(['finance manager']))
      {
  
      res.json(getReimbursementsById(id));
  
      }
    }
  });






reimbursementsRouter.get('/reimbursements/author/userId/:userId', (req : Request, res : Response) => {
    
  const id = +req.params.id; 

  if(isNaN(id)) {

    res.status(400).send('Must include numeric id in path');

  } else {
    
    if ((req.session && req.session.role ==='finance manager') && (req.session && req.session.userId === id)) {

    res.json(getReimbursementsById(id));

    };
  }
});*/