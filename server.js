import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import ejsmate from "ejs-mate";
import path from "path";
//import connect from "./connect.mjs";
import router from "./routes/dashboard.js";
import logrouter from "./routes/account-route.js"
//import courseRouter from "./routes/courseRouter.js";
const __dirname = path.resolve(path.dirname(""));
const app = express();
const PORT = 3000;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.engine('ejs', ejsmate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
//using routes
//app.use('/student', router);



// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());
app.use('/', logrouter);
app.use('/', router);
//app.use('/course', courseRouter);

//username and password
// const myusername = "user1";
// const mypassword = "mypassword";

//var session;


// app.get('/', (req, res) => {
//   res.render('login');
// })

// app.get("/login", (req, res) => {
//   session = req.session;
//   if (session.userid) {
//     res.send("Welcome User <a href='/logout'>click to logout</a>");
//   } else{
//     //res.sendFile("index.html", { root: __dirname });
//     res.render('users/login')
//   } 
// });

// app.get('/register', (req, res) => {
//   res.render('users/register');
// })

// app.get('/profile', (req, res) => {
//   res.render('users/profile',)
// })



// app.post("/user", (req, res) => {
//   const username = req.body.username
//   if (req.body.username == myusername && req.body.password == mypassword) {
//     session = req.session;
//     session.userid = req.body.username;
//     console.log(req.session);
//     res.render('dashboard', {username});
//     //res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
//   } else {
//     res.send("Invalid username or password");
//   }
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });


app.listen(PORT, () => console.log(` http://localhost:${PORT}`));
