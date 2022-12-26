const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//Login
app.post("/carrierlogin", async (req, res) => {
  try {
    const { username,password } = req.body;
    console.log(username)
    console.log(password)
    const allTodos = await pool.query("select username,password from userinfo where username=$1 and password= $2",[username,password]);
    // console.log(allTodos)
    if(allTodos.rowCount>0){
    res.json('LOGGEDIN');
  }
  else{
    res.json('INCORRECT USERNAME AND PASSWORD');
  }
  } catch (err) {
    console.error(err.message);
  }
});



//Carrier Sign up
// app.post("/carriersignup", async (req, res) => {
//   try {
//     const {fullname,companyname,username,password} = req.body;
//     const checkusername = await pool.query(
//     "select username from userinfo where username=$1"
//       [username]
//     );
//     if(checkusername.rowCount===0){
//     const carriersignup = await pool.query(
//       "INSERT INTO carrier (fullname,companyname,password,username) VALUES($1,$2,$3,$4) RETURNING *",
//       [fullname,companyname,username,password,]
//     );
//     res.json("Sign up successful");
//   }
//   else{
//     res.json("Username already exist");
//   }

    
//   } catch (err) {
//     console.error(err.message);
//   }
// });


//loaddetaisl
app.post("/loaddetails", async (req, res) => {
  try {
    const { loadid,pickup,dropoff,rate,booked,weight,equipmenttype,pickupdate,dropoffdate } = req.body;
    const loaddetainfo = await pool.query(
    "INSERT INTO loaddetails (pickup,dropoff,rate,booked,weight,equipmenttype,pickupdate,dropoffdate) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [pickup,dropoff,rate,booked,weight,equipmenttype,pickupdate,dropoffdate] 
    );
  
    res.json("Load posted successfully");
    }
    catch (err) {
      console.error(err.message);
    }
  });


//Signup

app.post("/signup", async (req, res) => {
  try {
    const { name,username,password } = req.body;
    const checkusername = await pool.query(
      "select username from userinfo where username=$1",
      [username]
    );
    if(checkusername.rowCount==0){
    const signupinfo = await pool.query(
      "INSERT INTO userinfo (name,password,username) VALUES($1,$2,$3) RETURNING *",
      [name,password,username]
    );
    res.json("Sign up successful");
  }
  else{
    res.json("Username already exist");
  }

    
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from userinfo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { username,password } = req.body;
    console.log(username)
    console.log(password)
    const allTodos = await pool.query("select username,password from userinfo where username=$1 and password= $2",[username,password]);
    // console.log(allTodos)
    if(allTodos.rowCount>0){
    res.json('LOGGEDIN');
  }
  else{
    res.json('INCORRECT USERNAME AND PASSWORD');
  }
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});