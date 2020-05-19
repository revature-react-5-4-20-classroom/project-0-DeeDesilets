import  User  from '../models/User';
import Reimbursement from '../models/Reimbursement';
import { PoolClient, QueryResult } from 'pg';
import { connectionPool } from '.';
import { usersRouter } from '../Routers/usersRouter';



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

export async function updateUser(userId?: number, userName?: string, passWord?: string, firstName?: string, lastName?: string, eMail?: string, roLe?: string) : Promise<User> {
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
     `UPDATE users 
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
  
export async function addNewUser(user: User) : Promise<User> {
console.log('hi from add a new user');
  let client : PoolClient = await connectionPool.connect();

  try {
  console.log('hi from inside try on addnewuser');
    
   await client.query(

      `INSERT INTO users (userid, username, "password", firstname, lastname, email, role) VALUES

      (DEFAULT, $1, $2, $3, $4, $5, $6);`, [user.username, user.password, user.firstName, user.lastName, user.email, user.role]
    )
    let result: QueryResult = await client.query(
      `SELECT * FROM users
      WHERE username = user.username;`
    )
    let newArray : User[] = result.rows.map((u) => {
      return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
    });
    return newArray[0];

  } catch (e) {

    throw new Error(`Failed to add user to DB: ${e.message}`);

  } finally {

    client && client.release();

  }

}

export async function checkingCredentials(username: string, password: string) : Promise<User> {
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult = await client.query(
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
  let client : PoolClient  = await connectionPool.connect();
  try {
    let result : QueryResult = await client.query('INSERT INTO reimbursements (reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type) VALUES (DEFAULT, $1, $2, $3, -999999, $4, -99, 3, $5);', [author, amount, datesubmitted, description, type]);
  console.log(result);
  let returnValue : QueryResult = await client.query('SELECT * FROM reimbursements WHERE author = $1 AND datesubmitted = $2;', [author, datesubmitted]);
  let newArray : Reimbursement[] = returnValue.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  return newArray[0];
  } catch(e) {
    throw new Error(`Failed to query for all reimbursements: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}


export async function updateReimbursements (reimbursementId? : number, author? : number, amount? : number, dateSubmitted? : number, dateResolved? : number, description? : string, resolver? : number, status? : number, type? : number ) : Promise<Reimbursement> {
  console.log("hi from updatereimbursments");
  let client : PoolClient = await connectionPool.connect();
  try {
    
    if (author) {await client.query('UPDATE reimbursements SET author = $1 WHERE reimbursementid = $2;', [author, reimbursementId]);}
    if (amount) {await client.query('UPDATE reimbursements SET amount = $1 WHERE reimbursementid = $2;', [amount, reimbursementId]);}
    if (dateSubmitted) {await client.query('UPDATE reimbursements SET datesubmitted = $1 WHERE reimbursementid = $2;', [dateSubmitted, reimbursementId]);}
    if (dateResolved) {await client.query('UPDATE reimbursements SET dateresolved = $1 WHERE reimbursementid = $2;', [dateResolved, reimbursementId]);}
    if (description) {await client.query('UPDATE reimbursements SET description = $1 WHERE reimbursementid = $2;', [description, reimbursementId]);}
    if (resolver) {await client.query('UPDATE reimbursements SET resolver = $1 WHERE reimbursementid = $2;', [resolver, reimbursementId]);}
    if (status) {await client.query('UPDATE reimbursements SET status = $1 WHERE reimbursementid = $2;', [status, reimbursementId]);}
    if (type) {await client.query('UPDATE reimbursements SET type = $1 WHERE reimbursementid = $2;', [type, reimbursementId]);}
      
    
    
    let result : QueryResult = await client.query(
      'SELECT * FROM reimbursements WHERE reimbursementid = $1;', [reimbursementId]);
    
  console.log(result);
  
  let newArray : Reimbursement[] = result.rows.map((u) => {
    return new Reimbursement(u.reimbursementid, u.author, u.amount, u.datesubmitted, u.dateresolved, u.description, u.resolver, u.status, u.type);
  });
  console.log(newArray);
  return newArray[0];
  } catch(e) {
    throw new Error(`Failed to update reimbursement in database: ${e.message}`);
  } finally {
  
    client && client.release();
  }
}