import express, {Router, Request, Response, NextFunction} from 'express';
import Reimbursement from '../models/Reimbursement';
//import {authRoleFactory} from '../Middleware/authMiddleware';
//import session from 'express-session';
import {getReimbursementsBySID, getReimbursementsByAUID, getAllReimbursements, submitReimbursements, updateReimbursements} from '../repository/user-data-access'

export const reimbursementsRouter : Router = express.Router();


reimbursementsRouter.get('/status/:statusId', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to reimbursementsRouter, get@/reimbursements/status/:statusId');
console.log(req.session);
  const id = +req.params.statusId;
  console.log(id);
  if(isNaN(id)) {

    res.status(400).send('Must include numeric id in path');

} else if (req.session && req.session.user.role === 'finance manager') {
      try {
      console.log('hi from inside try block on usersRouter');
      const reimbursements = await getReimbursementsBySID(id);
        res.json(reimbursements);  //returns an ordered reimbursement array by date
      }
      catch (e) {
        console.log("caught error on reimbursementsRouter");
          next(e);
    
      } }else {res.status(401).send('The incoming token has expired.');}
})

 reimbursementsRouter.get('/author/userId/:userId', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements/author/userId/:userId');
    console.log(req.session);
  const id = +req.params.userId;
  console.log(id);
      if(isNaN(id)) {
    
        res.status(400).send('Must include numeric id in path');
    
    } else if (((req.session) && (req.session.user.role === 'finance manager')) || (req.session && req.session.user.userId === id)) {
          try {
          console.log('hi from inside try block on usersRouter');
          let reimbursement : Reimbursement[] = await getReimbursementsByAUID(id);
            res.json(reimbursement);  //returns an ordered reimbursement array by date
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } }else {res.status(401).send('The incoming token has expired.');}
})

reimbursementsRouter.get('/', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements');
    
  if (req.session && req.session.user.role === 'finance manager')  {
          try {
          console.log('hi from inside try block on usersRouter');
          let reimbursements = await getAllReimbursements();
            res.json(reimbursements);  //returns an ordered reimbursement array by date
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          } }else {res.status(401).send('The incoming token has expired.');}
})

// assumes users send request with all necessary fields for new reimbursement 
//[no date resolved, resolver, or status necessary] in a JSON object in the request body with Reimbursement ID = 0
reimbursementsRouter.post('/', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, post@/reimbursements');
  const {reimbursementId, author, amount, datesubmitted, description, type} = req.body; 
  
          try {
          console.log('hi from inside try block on usersRouter');
          let reimbursement = await submitReimbursements(reimbursementId, author, amount, datesubmitted, description, type);  //returns a single reimbursement
            res.status(201).send(reimbursement);
            
          }
          catch (e) {
          console.log("caught error on reimbursementsRouter");
          next(e);
        
          } 
})

// assumes users send request with fields to update inside a JSON object in the request body
reimbursementsRouter.patch('/', async (req : Request, res : Response, next : NextFunction) =>{
  console.log('made it to, get@/reimbursements');
  const {reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type} = req.body; 
  if (req.session && req.session.user.role === 'finance manager')  {
          try {
          console.log('hi from inside try block on usersRouter'); 
          let reimbursement = await updateReimbursements(reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type );  //returns a single reimbursement
            res.status(201).send(reimbursement);
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
        
          }
  }else {res.status(401).send('The incoming token has expired.');}
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