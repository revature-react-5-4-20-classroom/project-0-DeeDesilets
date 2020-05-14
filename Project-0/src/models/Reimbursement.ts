export default class Reimbursement {
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number;
    constructor (id: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number) // foreign key -> ReimbursementType
    {
        this.reimbursementId=id;
        this.author=author;
        this.amount=amount;
        this.dateSubmitted=dateSubmitted;
        this.dateResolved=dateResolved;
        this.description=description;
        this.resolver=resolver;
        this.status=status;
        this.type=type;

    } 
}