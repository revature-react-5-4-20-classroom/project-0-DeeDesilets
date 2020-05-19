import  User  from '../models/User';
import Reimbursement from '../models/Reimbursement';
import { PoolClient, QueryResult } from 'pg';
import { connectionPool } from '.';



export async function getAllUsers(): Promise<User[]> {
  console.log("hi from getallusers");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM users;`
    );
  console.log(result);
  for(let row of result.rows) {
    console.log(row.username);
    }
  let returnArray = result.rows.map((u) => {
    return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
    });
  console.log (returnArray);
  return returnArray;
  } catch(e) {
    throw new Error(`Failed to query for all users: ${e.message}`);
    } finally {

    client && client.release();
  }
}

export async function updateUser(userId: number, userName: string, passWord: string, firstName: string, lastName: string, eMail: string, roLe: string) : Promise<User> {
  console.log('hi from updateuser');
  let client : PoolClient = await connectionPool.connect();
  try {
    console.log('hi from inside try on updateuser');

    let query : string = ``;
    if (userName) {query += `username = '${userName}'`;}
    if (passWord) {query += `"password" = '${passWord}'`;}
    if (firstName) {query += `firstname = '${firstName}'`;}
    if (lastName) {query += `lastname = '${lastName}'`;}
    if (eMail) {query +=  `email = '${eMail}'`;}
    if (roLe) {query += `role = '${roLe}'`;}
console.log(query);
    
    await client.query(
     `UPDATE users '
      SET ${query}
      WHERE userid = ${userId};` 
    )
    let result : QueryResult = await client.query(
      `SELECT * FROM users 
      WHERE userid = ${userId};`
    )
    console.log(result);
    let userArray : User[] =  result.rows.map((u) => {
      return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
    })
    console.log(userArray);
    return userArray[0];
  
  } catch (e) {
    throw new Error(`Failed to update user in DB: ${e.message}`);
  } finally {
  
    client && client.release();
  }
  }
  
/*export async function addNewUser(user: User) : Promise<boolean> {
console.log('hi from add a new user');
  let client : PoolClient = await connectionPool.connect();

  try {
console.log('hi from inside try on addnewuser');
    
    let insertUserResult : QueryResult = await client.query(

      `INSERT INTO users (userid, username, "password", firstname, lastname, email, role) VALUES

      ($1, $2, $3, $4, $5, $6, $7);`, [user.userId, user.username, user.password, user.firstName, user.lastName, user.email, user.role]

    )

    return true;

  } catch (e) {

    throw new Error(`Failed to add user to DB: ${e.message}`);

  } finally {

    client && client.release();

  }

}*/

export async function checkingCredentials(username: string, password: string) : Promise<User> {
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM users 
      WHERE users.username = $1 AND users.password = $2;`, [username, password]
    );
    const usersMatchingUsernamePassword = result.rows.map((u) => {
      return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
    })
    if(usersMatchingUsernamePassword.length > 0) {
      return usersMatchingUsernamePassword[0];
    } else {
      throw new Error('Username and Password not matched to a valid user');
    }
  } catch (e) {
    throw new Error(`Failed to validate User with DB: ${e.message}`);
  } finally {

    client && client.release();

  }
}

export async function getUserByID(id: number): Promise<User> {
  console.log("hi from getuserbyid");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM users;`
    );
  console.log(result);
  for(let row of result.rows) {
      console.log(row.username);
  }
  let newArray = result.rows.map((u) => {
    return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
  });
  return (newArray.filter((user) => {
    return (user.userId === id )}))[0];
  } catch(e) {
    throw new Error(`Failed to query for all users: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function getReimbursementsBySID(id : number) : Promise<Reimbursement[]> {
  console.log("hi from getreimbursentsbysid");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM reimbursements 
      WHERE status = ${id}
      ORDER BY datesubmitted DESC;`
    );
  console.log(result);
  
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray;
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function getReimbursementsByAUID(id : number) : Promise<Reimbursement[]> {
  console.log("hi from getreimbursentsbyauid");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM reimbursements 
      WHERE author = ${id}
      ORDER BY datesubmitted DESC;`
    );
  console.log(result);
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray;
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function getAllReimbursements() : Promise<Reimbursement[]> {
  console.log("hi from getallreimbursents");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT *
      FROM reimbursements 
      ORDER BY datesubmitted DESC;`
    );
  console.log(result);
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray;
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function submitReimbursements (reimbursementId = 0, author : number, amount : number, datesubmitted : number, description : string, type : number ) : Promise<Reimbursement> {
  console.log("hi from submitreimbursements");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult = await client.query(
    `INSERT INTO reimbursements
    (reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, "type")
      VALUES (DEFAULT, ${author}, ${amount}, ${datesubmitted}, -999999, ${description}, -99, 3, ${type});`
    )
  console.log(result);
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray[0];
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function updateReimbursements (reimbursementid? : number, author? : number, amount? : number, datesubmitted? : number, dateresolved? : number, description? : string, resolver? : number, status? : number, type? : number ) : Promise<Reimbursement> {
  console.log("hi from updatereimbursments");
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
    `UPDATE reimbursements
    SET "author" = ${author}, "amount" = ${amount}, "datesubmitted" = ${datesubmitted}, "dateresolved" = ${dateresolved}, "description" = ${description}, "resolver" = ${resolver}, "status" = ${status}, "type" =${type}
    WHERE "reimbursementid" = ${reimbursementid};`
    );
  console.log(result);
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray[0];
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}
