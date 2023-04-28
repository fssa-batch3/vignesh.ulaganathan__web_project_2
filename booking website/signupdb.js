// //Installing and Importing neccessary module

// const mysql = require('mysql')
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const encoder = bodyParser.urlencoded()

// // seting up css file for html files
// app.use("/assets",express.static("assets"))

// // intializing connection to MySQL Database
// const connection = mysql.createConnection({
//     // define mysql confrigation in json format 
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database:"freshbase"
// })
// //connecting to mysql 
// connection.connect(error => {
//     if(error){
//         throw error;
//     }
//     else{
//     console.log("MySQL Successfully Connected");
//     }
// })

// // geting neccesary html files 
// app.get('/',(request, response) => {
//     response.sendFile(__dirname + "/index.html")
// })

// app.get('/signup',(request, response) => {
//     response.sendFile(__dirname + "/Pages/signup.html")
// })

// app.get('/login',(request, response) => {
//     response.sendFile(__dirname + "/Pages/login.html")
// })

// app.get('/profile',(request, response) => {
//     response.sendFile(__dirname + "/Pages/profile.html")
// })

// app.get('/dashboard',(request, response) => {
//     response.sendFile(__dirname + "/Pages/dashboard.html")
// })

// app.get('/task',(request, response) => {
//     response.sendFile(__dirname + "/Pages/Task Page.html")
// })

// app.get('/timer',(request, response) => {
//     response.sendFile(__dirname + "/Pages/timer.html")
// })

// app.get('/habit',(request, response) => {
//     response.sendFile(__dirname + "/Pages/habit.html")
// })

// app.get('/journal',(request, response) => {
//     response.sendFile(__dirname + "/Pages/journal.html")
// })

// app.get('/leaderboard',(request, response) => {
//     response.sendFile(__dirname + "/Pages/leaderboard.html")
// })

// //  LOGIN CHECK 
// app.post('/',encoder, (request, response) => {
//     let loginname = request.body.emaillogin;
//     let loginemail = request.body.emaillogin;
//     let loginpassword = request.body.passwordlogin;
//     let loginCheck  = `SELECT * FROM users `;
//     connection.query(loginCheck, (err, result) => {
//     let j = 0;  
//     for(let i =0; i < result.length; i++){
//         if(result[i]["useremail"] === loginemail || result[i]["username"] === loginname && result[i]["userpassword"] == loginpassword){
//             j = 1;
//             break;
//         }
//     }
//     if(j == 1){
//         response.redirect("/profile")
//         response.send(console.log("Logged In"));
//     }
//     else{
//         response.redirect("/signup")
//         response.send(console.log("Invalid Credentials"))
//     }

//         response.end();
//     })
// })


// //  SINGUP STORE 
// app.post('/',encoder, (request, response) => {
//     let username = request.body.name;
//     let useremail = request.body.email;
//     let userpassword = request.body.password;

    
//     let sql = "INSERT INTO users (username, useremail, userpassword) VALUES ('"+username+ "', '"+useremail+"','"+userpassword+"')";
//     connection.query(sql, function (err, result) {
//     if (result.length > 0 ) {
//         response.redirect("/profile")
//     }
//     else{
//         response.redirect("/profile")
//     }
//     console.log(result.affectedRows + " record(s) updated");

//     response.end();
//   });
// });


// // Task Store 
// app.post('/task',encoder, (request, response) => {
//     let taskinput = request.body.addtask;
//     let sql = `INSERT INTO user_task (task) VALUES (${taskinput})`;
//     connection.query(sql, (err, result) => {
//         if(result.length > 0 ){
//             response.send(console.log(taskinput))// write message
//         }
//         response.end();
//     })
// });


// // PORT NUMBER 
// app.listen(3300)