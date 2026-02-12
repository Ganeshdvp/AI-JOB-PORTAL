# AI-JOB-PORTAL

API DESIGN

Authentication
- POST /user/register
- POST /user/login
- POST /user/logout
- POST /user/change-password


# Task - 1 - Installation
- npm init
- npm install express
- npm install nodemon
- npm install dotenv and configure
- npm i mongoose
- npm install bcrypt
- npm i validator
- npm i jsonwebtoken
- npm i cookie-parser
- npm i date-fns





# Task-2
- create server.js file
- create .env file
   - storing sensitive data
- create routes folder
   - authRoute.js
      - Authentication routes '/register, /login, /logout and /change-password'
- created config folder
   - db.js
     - configure database connection
- created models folder
   - user.js
      - created userSchema and model
- created middleware folder
   - userAuth.js
   - roleAuth.js - to write the rolebased logic
- create utils folder
   - validations.js


