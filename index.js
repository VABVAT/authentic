const express = require("express");
const app = new express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_SECRET = "nfjklgvsdfngvjlkdasd";

//! another type of middleware for css files (express.static('public'))->shows all files in the public folder
//! more than one HTML pages ............... use cors() as using / i was able to host index on same port  but not other pages

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

var db = [];

app.get("/",(req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//* When a user logs in, they provide credentials to the server, which verifies them against the database.
//* If the credentials are correct, the server generates a token and sends it back to the client.
//* For subsequent requests, the client sends the token in the request headers (or other locations). 
//* The server can validate the token (checking its signature and expiration) and extract user information from it without 
//* needing to query the database again.
function verifier(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    const obj = db.find((ob)=>{
        return ob.username === username && ob.password === password;
    })
    if(obj) next();
    else{
        res.status(401).send("wrong");
    } 
}

app.post("/signup", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.push({username: username,
             password: password
    });
    res.status(200).send("Sign up succesful");
})

app.post("/signin", verifier ,(req, res)=>{
    const token = jwt.sign({user: req.body.username}, JWT_SECRET);
    res.status(200).send(token);
})

app.post("/addTodo", (req, res)=>{
    //! local storage does not exists in node or express it can only be accesed from frontEnd
    
    
    const token = req.headers.token;
    //! token is not stored in data base
    const user = jwt.verify(token, JWT_SECRET);
    if(user){
        const name = user.user;
        const obj = db.find((ob)=>{
            return ob.username === name;
        })
        if(!obj.tasks) obj.tasks = [];
        if(req.body.task_){
        obj.tasks.push(req.body.task_);
        }
        res.status(200).json(obj.tasks);
    }else{
        res.status(401).send("Unauthorized");
    }

})


app.listen(3000)