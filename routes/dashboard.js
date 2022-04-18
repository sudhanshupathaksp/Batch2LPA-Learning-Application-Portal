import express from "express";
import connect from "../connect.mjs";
const router = express.Router();
let session
// student
router.get('/dash', async (req, res)=>{
    if (!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select u_id, user_role from appuser where username = '${username}'`;
    let result = await connect(query)
    const user_id =result["rows"][0][0]
    const user_role = result["rows"][0][1]
    if (user_role == 'student'){
        query = `select cname, startdate, enddate, cduration, batchcount from courses join student_course on courses.c_id = student_course.c_id join appuser on appuser.u_id = '${user_id}'`
        result = await connect(query)
        result = result.rows;
        console.log(result);
        res.render('dashboards/student', {result})
    } 
    else{
        query = `select * from courses`
        result = await connect(query)
        result = result.rows
        return res.render('dashboards/instructor', {result})
    } 
})

router.get('/all',async (req,res)=>{
    if (!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select user_role from appuser where username = '${username}'`
    let result = await connect(query)
    const user_role = result['rows'][0]
    if (user_role == 'student'){
        query = `select * from courses`
        result = await connect(query)
        result = result.rows
        return res.render('dashboard/courses', {message:"student"})
    }
    res.render('dashboard/courses', {message:"instructor"})
})

// enroll into a course
router.get('/all/:c_id',async(req, res)=>{ /// expects localhost/all/c_id
    if (!req.session) return res.redirect('/login')
    const c_id = req.params.c_id
    const username = req.session.userid
    let query = `select u_id from appuser where username = '${username}'`
    let result = await connect(query)
    const user_id = result['rows'][0]
    query = `insert into student_course (u_id, c_id) values ('${user_id}', '${c_id}') `
    result = await connect(query)
    result = result.rows 
    
    query = `update courses set batchcount = batchcount+1 where c_id = '${c_id}') `
    result = await connect(query)
    return res.redirect('/')
})

router.get('/profile', async (req,res)=>{
    if (!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select * from appuser where username = '${username}'`
    let result = await connect(query)
    result = result.rows 
    return res.redirect('profile', {result})
} )


// instructor
router.get('/addc', async(req, res)=>{
    if(!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select user_role from appuser where username = '${username}'`
    let result = await connect(query)
    const user_role = result['rows'][0]
    if(user_role == 'instructor'){
        return res.render('dashboards/addcourse')
    }
    else return res.send("you don't have permission to view this page")
})


router.post('/add', async(req, res)=>{
    if(!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select user_role from appuser where username = '${username}'`
    let result = await connect(query)
    const user_role = result['rows'][0]
    if(user_role == 'instructor'){
        const startdate = String(req.body.startdate);
        const enddate = String(req.body.enddate);
        const {cname, cduration} = req.body
        query = `insert into courses (cname, startdate, enddate, cduration, batchcount) values ('${cname}', TO_DATE('${startdate}', 'DD-MM-YYYY'), TO_DATE('${enddate}','DD-MM-YYYY'), '${cduration}', '0')`
        await connect(query)
        res.redirect('/dash')    
        }
    else{return res.send("you don't have permission to view this page")}
})

router.get('/update/:c_id', async(req, res)=>{
    if(!req.session) return res.redirect('/login')
    const c_id = req.params.c_id
    const username = req.session.userid
    let query = `select user_role from appuser where username = '${username}'`
    let result = await connect(query)
    const user_role = result['rows'][0]
    if(user_role == 'instructor'){
        query = `select * from courses where c_id = '${c_id}'`
        result = await connect(query)
        result = result.rows
        return res.render('update', {result})
    }
    else{return res.send("you don't have permission to view this page")}
})

router.post('/update/:c_id', async(req, res)=>{
    if(!req.session) return res.redirect('/login')
    const username = req.session.userid
    let query = `select user_role from appuser where username = '${username}'`
    let result = await connect(query)
    const user_role = result['rows'][0]
    if(user_role == 'instructor'){
        const {cname,startdate,enddate, cduration} = req.body 
        query = `update courses set (cname,startdate,enddate, cduration) values ('${cname}','${startdate}','${enddate}', '${cduration}'`
        await connect(query)
        res.redirect('/')
    }
    else{return res.send("you don't have permission to view this page")}

})


export default router;


