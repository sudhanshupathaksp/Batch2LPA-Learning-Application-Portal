import oracledb from "oracledb";

//const query = "SELECT * FROM DEPT";
async function connect(query) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "c##aduser",
      password: "root",
      connectString: "localhost:1521/xe",
    });
    //console.log("connection done");
    let runquery = await connection.execute(query);
    connection.commit();
    //console.log(runquery);
    return runquery;
  } catch (err) {
    console.log(err);
  }
}
//connect();
export default connect;
