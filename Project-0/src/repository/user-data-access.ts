import  User  from '../models/User';



import { PoolClient, QueryResult } from 'pg';

import { connectionPool } from '.';



// an async function can await Promises instead of using callbacks

// async functions return Promises

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

    return result.rows.map((u) => {

      return new User(u.id, u.username, u.password, u.firstName, u.lastName, u.email, u.role);

    });

  } catch(e) {

    throw new Error(`Failed to query for all users: ${e.message}`);

  } finally {

    
    client && client.release();

  }

}

export async function updateUser(userId: number, username: string, password: string, firstName: string, lastName: string, email: string, role: string) : Promise<boolean> {
  console.log('hi from add a new user');
    let client : PoolClient = await connectionPool.connect();
    
    try {
  console.log('hi from inside try on updateuser');
      
      await client.query(
  
      `UPDATE users 
      SET username = ${username}, "password" = ${password}, firstname = ${firstName}, lastname = ${lastName}, email = ${email}, role = ${role}
      WHERE userid = ${userId};`
      )
  if(!client.query) {
      return false;
  }else {return true;}
  
    } catch (e) {
  
      throw new Error(`Failed to update user in DB: ${e.message}`);
  
    } finally {
  
      client && client.release();
  
    }}
  
  
  




export async function addNewUser(user: User) : Promise<boolean> {
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

}



export async function checkingCredentials(username: string, password: string) : Promise<User> {

  let client : PoolClient;

  client = await connectionPool.connect();

  try {

    let result : QueryResult;

    // above, when retrieving all users, we used a plain old string for our SQL query

    // Using a string is fine provided you never do string concatenation or template literals

    // -- provided you don't produce the string programmatically.

    // If we're producing the string programmatically, then we open ourselves up to SQL Injection

    // SQL Injection is when somehow the user is able to cause unintended SQL queries to be run.

    // We need to be worried about someone attempting to login with the username ';DROP TABLE users'



    // To solve this, we have parameterized queries, where we send a query and the values we want

    // to plug into it together to the database, and the database prevents anything fishy from happening.

    // This will replace the $1 and $2 with username and password respectively:

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
  
        return (user.userId === id )}))[9];
  
    } catch(e) {
  
      throw new Error(`Failed to query for all users: ${e.message}`);
  
    } finally {
  
      
      client && client.release();
  
    }
  
  }