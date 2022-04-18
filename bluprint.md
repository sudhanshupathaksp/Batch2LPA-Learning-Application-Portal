learning portal routes

GET - / home page
2 buttons
-login (POST /login)
login form - username (email-id) - password
-register(POST- /register) - student name - qualification - experience - profilepic - email - password

if (student){
redirect to -> studentdashboard.ejs
}else{
redirect to -> instructordashboard.ejs
}

- Studentdashboard.ejs
  - view profile (GET /profile)
  - edit profile (PUT /edit/:s_id)
  - view enrolled courses (GET /)




functionalities to be achieved

-- For students

1) To view All courses
we have to fire a get request and perform
select * from courses.

2) To view enrolled courses
get request with the s_id and then an inner join query on course table
select 
    *
  from 
  Courses
  inner join student
  on student.s_id = courses.s_id

  student_id = select s_id from student where email ='{session.userid}'
  result = select * from courses where s_id = student_id


3) to enroll into the course
post request with s_id and an insert query on the course table's sid column
insert into courses values() where c_id =  req.body.c_id;

student -> table -> student details
course -> course details
student-course -> stud - course

id sid cid
1   1   10
2   1   2
3   2    10
4   2    3
DELETE FROM STUDENT-COURSE WHERE SID=STUDENTID AND CID =CID
{
  COURSE: [1,2,3,4]
}

select cid from student-course where sid=student_id


