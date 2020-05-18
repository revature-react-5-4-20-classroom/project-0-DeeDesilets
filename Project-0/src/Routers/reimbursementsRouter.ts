import express, {Router, Request, Response, NextFunction} from 'express';
import Reimbursement from '../models/Reimbursement';
//import {authRoleFactory} from '../Middleware/authMiddleware';
//import session from 'express-session';
import {getReimbursementsBySID, getReimbursementsByAUID, getAllReimbursements, SubmitReimbursements, UpdateReimbursements} from '../repository/user-data-access'

export const reimbursementsRouter : Router = express.Router();


reimbursementsRouter.get('/reimbursements/status/:statusId', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to reimbursementsRouter, get@/reimbursements/status/:statusId');

  const id = +req.params.statusid;
  /*console.log(id);
  if(isNaN(id)) {

    res.status(400).send('Must include numeric id in path');

} else */if (req.session && req.session.user.role === 'finance manager') {
      try {
      console.log('hi from inside try block on usersRouter');
        res.json(getReimbursementsBySID(id));  //returns an ordered reimbursement array by date
      }
      catch (e) {
      console.log("caught error on usersRouter");
        next(e);
    
      } }else {res.sendStatus(401).send('The incoming token has expired.');}
})

 reimbursementsRouter.get('/reimbursements/author/userId/:userId', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements/author/userId/:userId');
    
  const id = +req.params.statusid;
   /*console.log(id);
      if(isNaN(id)) {
    
        res.status(400).send('Must include numeric id in path');
    
    } else */if ((req.session && req.session.user.role === 'finance manager') || (req.session && req.session.user.userId === id)) {
          try {
          console.log('hi from inside try block on usersRouter');
            res.json(getReimbursementsByAUID(id));  //returns an ordered reimbursement array by date
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } }else {res.sendStatus(401).send('The incoming token has expired.');}
})

reimbursementsRouter.get('/reimbursements', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements');
    
  if (req.session && req.session.user.role === 'finance manager')  {
          try {
          console.log('hi from inside try block on usersRouter');
            res.json(getAllReimbursements());  //returns an ordered reimbursement array by date
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } }else {res.sendStatus(401).send('The incoming token has expired.');}
})

// assumes users send request with fields for new reimbursement in a JSON object in the request body
reimbursementsRouter.post('/reimbursements', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements');
  const {author, amount, datesubmitted, description, resolver, status, type} = req.body; 
  
          try {
          console.log('hi from inside try block on usersRouter');
            res.json(SubmitReimbursements(author, amount, datesubmitted, description, resolver, status, type));  //returns a single reimbursement
            res.sendStatus(201).send("Created");
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } 
})

// assumes users send request with fields to update inside a JSON object in the request body
reimbursementsRouter.patch('/reimbursements', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements');
  const {reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type} = req.body; 
  if (req.session && req.session.user.role === 'finance manager')  {
          try {
          console.log('hi from inside try block on usersRouter');
            res.json(UpdateReimbursements(reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type ));  //returns a single reimbursement
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } 
  }else {res.sendStatus(401).send('The incoming token has expired.');}
})

    
    
    













/*
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
*/