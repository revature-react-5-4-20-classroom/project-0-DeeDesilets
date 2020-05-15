import Role from './models/Role';
import User from './models/User';
import ReimbursementStatus from './models/ReimbursementStatus';
import ReimbursementType from './models/ReimbursementType';
import Reimbursement from './models/Reimbursement';

export const users : User [] = [
    new User(1,'a.anderson', 'annie4598', 'Anne', 'Anderson', 'anne.anderson@abc.gov', 'employee'),
    new User(2, 'b.browning', 'bethisgreat0214', 'Beth', 'Browning', 'beth.browning@abc.gov', 'finance manager'),
    new User(3, 'c.cooney', 'CMC06291963', 'Colleen', 'Cooney', 'colleeen.cooney@abc.gov', 'admin'),
    ];

export const roles : Role [] = [
    new Role (1001, 'employee'), 
    new Role (1002, 'finance manager'), 
    new Role (1003, 'admin'),
];

export const rStatuses : ReimbursementStatus [] = [
    new ReimbursementStatus(2001, 'Pending'),
    new ReimbursementStatus(2002, 'Approved'),
    new ReimbursementStatus(2003, 'Denied'),
];

export const rTypes : ReimbursementType [] = [
    new ReimbursementType(3001, 'Lodging'),
    new ReimbursementType(3002, 'Food'),
    new ReimbursementType(3003, 'Travel'),
    new ReimbursementType(3004, 'Other')
];
export const reimbursements : Reimbursement [] = [
    new Reimbursement(4001, 3, 357, 200115, 200820, 'hotel for conference 1/3/20',  2, 2002, 3001),
    new Reimbursement(4002, 3, 57, 200115, -999999, 'dinner for conference 1/3/20', 2, 2001, 3002),
    new Reimbursement(4003, 1, 290, 200120, 200203, 'hotel for conference 1/3/20', 2, 2002, 3001)
];

        