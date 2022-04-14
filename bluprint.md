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
