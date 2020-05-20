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
  console.log(req.session);
  if ((req.session) && (req.session.user.role === 'finance manager')) {
    let reimbursement : Reimbursement = req.body;
    console.log(req.body);
    console.log('hi from inside authorizing if');
    console.log(`${reimbursement.reimbursementId}, ${reimbursement.author}, ${reimbursement.amount}, ${reimbursement.dateSubmitted}, ${reimbursement.dateResolved}, ${reimbursement.description}, ${reimbursement.resolver}, ${reimbursement.status}, ${reimbursement.type}`);
  
          try {
          console.log('hi from inside try block on usersRouter'); 
          let newreimbursement = await updateReimbursements(reimbursement.reimbursementId, reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.type );  //returns a single reimbursement
            res.status(201).send(reimbursement);
          }
          catch (e) {
          console.log("caught error on usersRouter");
            next(e);
          }
  }else {res.status(401).send('The incoming token has expired.');}
})

    
    
    











