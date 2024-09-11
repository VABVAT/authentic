const express = require("express");
const app = new express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "nfjklgvsdfngvjlkdasd";

app.use(express.json);

var db = [];

app.get("/",(req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000)