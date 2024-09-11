const express = require("express");
const app = new express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "nfjklgvsdfngvjlkdasd";

//! another type of middleware for css files (express.static('public'))->shows all files in the public folder
app.use(express.static('public'));
app.use(express.json());

var db = [];

app.get("/",(req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

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

app.get("/me", (req, res)=>{
    const token = localStorage.getItem("token");
    if(token){
       const decoder = jwt.verify(token, JWT_SECRET);
       res.status(200).send(decoder.user); 
    }else{
        res.status(400).send("wrong");
    }
})

app.listen(3000)