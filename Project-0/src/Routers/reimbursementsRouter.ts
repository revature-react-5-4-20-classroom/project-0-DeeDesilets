import express, {Router, Request, Response} from 'express';
import Reimbursement from '../models/Reimbursement';
import reimbursements from '/temp-database; 

export const reimbursementsRouter : Router = express.Router();

reimbursementsRouter.post('/reimbursements', (req:Request, res:Response) => {
  
    let {id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = req.body;
  
    if(id && author && amount && dateSubmitted && dateResolved && description && resolver && status && type) {
  
      addNewReimbursement(new Reimbursement(id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type));
 
      res.sendStatus(201);
  
    } else {
  
      res.status(400).send('Please include required fields.')
  
    }
  
  });



  function addNewReimbursement(reimbursement : Reimbursement): Reimbursement {

    // We should validate that the id is not already taken
  
    const reimbursementsMatchingId : Reimbursement [] = reimbursements.filter(
  
      (reimbursementElement: Reimbursement) => {
  
        return reimbursementElement.reimbursementId === reimbursement.reimbursementId;
  
      }
  
    );
  
    if (reimbursementsMatchingId.length === 0) {
  
      reimbursements.push(reimbursement);
  
      return reimbursement;
  
    } else {
  
      throw new Error('Reimbursement ID already taken');
  
    }
  
  }
  

  