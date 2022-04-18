// import express from "express";
// import connect from "../connect.mjs";
// const courseRouter = express.Router();


// courseRouter.get('/get', async (req, res) => {

//     let query =  'select * from courses'
//     let result = await connect(query);
//     console.log(result.rows);
//     result = result.rows;
//     res.send(result);
//     //res.send("to get all the courses")
// })

// courseRouter.get('/new', (req, res) => {
//     //res.render('addCourse')
//     res.send("send form")
// })

// courseRouter.post('/new', async (req, res) => {
//     const {cname, cduration, startdate, enddate,} = req.body;
//     const query = `insert into course  ('cname', 'cduration', 'startdate', 'enddate',) values (${cname}, ${cduration}, ${startdate}, ${enddate})`
//     const result = await connect(query);
//     console.log(result);
//     res.send("to add new courses");
// })

// courseRouter.put('/edit/:id', (req, res) => {})

// courseRouter.delete('/delete/:id', (req, res) => {
//     res.send("to delete the courses")
// })

// export default courseRouter;