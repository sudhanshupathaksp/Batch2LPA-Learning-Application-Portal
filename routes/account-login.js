import express from "express";
const logrouter = express.Router();
//import session from "express-session";
//import cookieParser from "cookie-parser";
import connect from "../connect.mjs";

//var session;

logrouter.get("/login", (req, res) => {
  res.render("login");
});

logrouter.post("/login", async (req, res) => {
  var session;
  const email = req.body.email;
  const password = req.body.password;
  const query = `select s_password from student where email ='${email}'`;
  const runquery = await connect(query);
  if (runquery["rows"][0][0] == password) {
    session = req.session;
    session.userid = email;
    //console.log(req.body.email);
    res.redirect("/profile");
  } else {
    res.send("invalid username or password");
  }
});

logrouter.get("/logout", (res, req) => {
  req.session.destroy();
  res.redirect("/login");
});

logrouter.get("/register", (req, res) => {
  res.render("register");
});

logrouter.post("/register", async (req, res) => {
  let {
    sname,
    contactno,
    email,
    qualification,
    experience,
    profile_pic,
    s_password
  } = req.body;
  const query = `insert into student (sname, contactno, email, qualification, experience, profile_pic, s_password) values  ('${sname}', '${contactno}', '${email}', '${qualification}', '${experience}', '${profile_pic}','${s_password}')`;
  let result = await connect(query);
  console.log(result);
  res.redirect("/account/login");
});

export default logrouter;
