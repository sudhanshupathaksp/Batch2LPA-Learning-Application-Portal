import express from "express";
const logrouter = express.Router();
//import session from "express-session";
//import cookieParser from "cookie-parser";
import connect from "../connect.mjs";

let session;

logrouter.get("/login", (req, res) => {
  res.render('users/login');
});

logrouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //const user_role = req.body.radios1;
  //console.log(user_role);

  
  //const role = req.body.role;
  const query = `select user_role, s_password from appuser where username ='${username}'`;
  const runquery = await connect(query);
  console.log(runquery.rows)
  if (runquery["rows"][0][1] == password) {
    session = req.session;
    session.userid = username;
    //console.log(req.body.email);
    // if(runquery["rows"][0][0] == "instructor"){
    //   res.render('dashboards/instructor', {username});
    // }
    // else{
    //   res.render('dashboards/student', {username});
    // }
    res.redirect('/dash')
  }
  else {
     res.send("invalid username or password"); }
});
   

logrouter.get("/register", (req, res) => {
  res.render('users/register')
});

logrouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { uname, username, contactno , s_password, experience, qualification } = req.body;
  const query = `insert into appuser (uname, user_role, contactno, username, qualification, experience, s_password) values  ('${uname}' ,'student', '${contactno}', '${username}', '${qualification}', '${experience}', '${s_password}')`;
  let result = await connect(query);
  //console.log(result.rows);
  res.redirect("/login");

} )

logrouter.get("/logout", (res, req) => {
  req.session.destroy();
  res.redirect("/login");
});




export default logrouter;



 
//logrouter.get("/logout", (res, req) => {  req.session.destroy();  res.redirect("/login");});

