## Base API
https://code-note-backend.vercel.app
## [API Live Link](https://code-note-backend.vercel.app)

## Technologies I Use
- TypeScript
- Express.js
- Mongoose
- JWT
- Nodemailer
- Multer
- Bcrypt
- Cloudinary etc.



| API Title              | Type        | Method    |  End Points      |
| :----------------  | :------:    | :--------:| :-----------:    |
| Create User        |   Teacher   | POST      | /user/teacher    |
| Get All Teacher    |   Teacher   | GET       |  /teacher        |
| Get A Teacher      |   Teacher   | GET       |  /teacher/:id    |
| Update A Teacher      |   Teacher   | PATCH       |  /teacher/:id    |
| Delete A Teacher      |   Teacher   | DELETE       |  /teacher/:id    |
||
| Create User        |   Student   | POST      | /user/student    |
| Get All Student    |   Student   | GET       |  /student        |
| Get A Student      |   Student   | GET       |  /student/:id    |
| Update A Student      |   Student   | PATCH       |  /student/:id    |
| Delete A Student      |   Student   | DELETE       |  /student/:id    |
||
| Create A Code        |   Code   | POST      | /code    |
| Create All Code        |   Code   | GET      | /code    |
| Create A Code        |   Code   | GET      | /code/:id    |
| Create A User All Codes        |   Code   | GET      | /code/user/:id    |
| Update A Code        |   Code   | PATCH      | /code/:id    |
| Delete A Code        |   Code   | DELETE      | /code/:id    |
||
| Create A Code Req        |   Code Stack   | POST      | /stack    |
| Cancel A Code Req        |   Code Stack   | DELETE      | /stack/:id    |
| My All Stack Req        |   Code Stack   | GET      | /stack/req/:id    |
| My All Ask Stack Req        |   Code Stack   | GET      | /stack/ask/:id    |
| Stack ask updation        |   Code Stack   | PATCH      | /stack/ask/:id    |
||
| Login User        |   Auth   | POST      | /auth/login    |
| Get Refresh Token        |   Auth   | GET      | /auth/refresh    |
| Change Password        |   Auth   | PATCH      | /auth/change    |
| Forget Password        |   Auth   | POST      | /auth/forget    |
| Reset Password        |   Auth   | PATCH      | /auth/reset    |
| Upload Profile Pic        |   Auth   | PATCH      | /user/profilepic?email=    |
