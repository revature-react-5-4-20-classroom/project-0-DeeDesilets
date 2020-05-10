
import express from "express";
import bodyparser from 'body-parser';
import IUser from "./iUser";
import IReimbursement from "./iReimbursement";
import IReimbursementStatus from "./iReimbursementStatus";
import IReimbursementType from "./iReimbursementType";
import IRole from "./iRole";
import {Application, Request, Response} from "express";

let users: IUser[] = [{"userId": 1, "username": "a.anderson", "password": "annie4598", "firstName": "Anne", "lastName": "Anderson", "email": "anne.anderson@abc.gov", "role": "employee"}, {"userId": 2, "username": "b.browning", "password": "bethisgreat0214", "firstName": "Beth","lastName": "Browning", "email": "beth.browning@abc.gov", "role": "finance manager"}, {"userId": 3, "username": "c.cooney", "password": "CMC06291963", "firstName": "Colleen", "lastName": "Cooney", "email": "colleeen.cooney@abc.gov", "role": "admin"}];
let roles: IRole[] = [{"roleId": 1001, "role": "employee"}, {"roleId": 1002, "role": "finance manager"}, {"roleId": 1003, "role": "admin"}];
let rStatuses: IReimbursementStatus [] = [{"statusId": 2001, "status": "Pending"}, {"statusId": 2002, "status": "Approved"}, {"statusId": 2003, "status": "Denied"}];
let rTypes: IReimbursementType [] = [{"typeId": 3001, "type": "Lodging"}, {"typeId": 3002, "type":"Food"}, {"typeId": 3003, "type": "Travel"}, {"typeId": 3004, "type": "Other"}];
let reimbursements: IReimbursement [] = [{"reimbursementId": 4001, "author": 3, "amount": 357, "dateSubmitted": 11520, "dateResolved": 20820, "description": "hotel for conference 1/3/20", "resolver": 2, "status": 2002, "type":3001}, {"reimbursementId": 4002, "author": 3, "amount": 57, "dateSubmitted": 011520, "dateResolved": 000000, "description": "dinner for conference 1/3/20", "resolver": 2, "status": 2001, "type":3002}, {"reimbursementId": 4003, "author": 1, "amount": 290, "dateSubmitted": 010920, "dateResolved": 020320, "description": "hotel for conference 1/3/20", "resolver": 2, "status": 2002, "type":3001}];

const app: Application = express();
app.use(bodyparser.json());

app.get('/users', (req: Request, res: Response) => {
    if (users.role = 1002)
        res.json(users);
    else
        console.log("The incoming token has expired");
});

app.post('/login', (req: Request, res: Response) => {
    
    if (users.password && )
    console.log(req.body);
    books.push(req.body);
    res.sendStatus(201);
        console.log("The incoming token has expired");
});


app.listen(8864, () => {console.log("server is functioning");});

