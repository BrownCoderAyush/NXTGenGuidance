# Documentation of NXTGenMentorShip API

### Database - 
`PostgreSQL`
### ORM -
`SEQUELIZE`

## Setup The Project

- Clone the repository on your local
- Execute `npm install` on the same path as root directory of your project
- Create a `.env` file in the root directory of your project and add the following environment variables
  - `PORT=3001`
  - `CLIENT_ID=<CLIENT_ID>`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_LOGIN_PASS>,
    "database": "Online_Transation_Diary_Dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create` and then execute `npx sequelize db:migrate`


## Endpoints

### GET /auth/google
Initiates a Google OAuth flow (Login with Google). Does nothing but redirects to Google's OAuth Consent Screen.

### GET /auth/google-callback
Provides a callback endpoint used by Google to initiate our side of login when User logs in through Google OAuth. This gets user data from Google and creates a user in out local Postgres database if no such user already exists with that email.

### GET /auth/logout
Used to logout a user (not proper implementation yet)

### DELETE /session/{id}
**AUTH TYPE: BEARER**
Used to delete a session, provided the `id` of session. Session can only be deleted if a user bearer token is provided and the user is the owner of the session.

### POST /session/
**AUTH TYPE: BEARER**
User to create a new session. Sessions created are owned by the owner of the bearer token.

Body:
```json
{
    "time": "UTC_TIMESTAMP",
    "price": "INT",
    "typeOfSession": "1-1" | "1-m" | "m-m"    
}
```
### GET /session/getSession
Used to search for sessions based on particular criterias.

Body:
```json
{
    "type" : "1-1" | "1-m" | "m-m",     
    "from" : "UTC_TIMESTAMP",
    "user_id" : "USER_ID", 
    "till" : "UTC_TIMESTAMP"
}
```
### POST /user/signup
Used to create a new user account

Body:
```json
{
    "username": "String",
    "password" : "String",
    "email": "String",
    "picture": "url"
}
```

### GET /user/me
**AUTH TYPE: Bearer** <br>
Used to get the user details of the logged in user. **(CONTAINS SENSITIVE DETAILS)**

### GET /user/{userID}
Used to get the public details of a user identified by the `userID` of the user.
  
### GET/user/mentor/{userId}
Used to get the public details of a mentor identified by the `userID` of the mentor. The user must be a mentor for this endpoint to work, if the user is not a mentor a 404 error will be received.