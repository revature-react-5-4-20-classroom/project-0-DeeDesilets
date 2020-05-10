import express from "express";
import bodyparser from 'body-parser';
import IBook from './iBooks';
import {Application, Request, Response} from 'express';
let books: IBook [] = [
{
    title: "The Lord of the Rings",
    author: "Tolkien",
    yearPublished: 1957 
},
{
    title: "Lord of the Flies",
    author: "William Golding",
    yearPublished: 1954
},
{
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    yearPublished: 1950
}
];
const app : Application = express();
app.use(bodyparser.json());
app.get('/books', (req:Request, res: Response)=>{
    res.json(books);});

app.post('/books', (req : Request, res: Response)=>{
    console.log(req.body);
    books.push(req.body);
    res.sendStatus(201);
});

app.use('/hello', (req: Request, res: Response) =>{
    res.json('Hello From Our Server');
});
app.listen(3000,()=>
{
    console.log('app has started');
});