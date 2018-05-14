const express = require('express')
var app = express()
const colors = ["red","green","blue"]

app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))

app.get('/', function(req,res){
  const firstName = "Michael"
  return res.render("index", {name: firstName})
})

app.get('/colors/', function(req,res){
  return res.render("data", {colors})
})


app.get('/instructor/:name', function(req,res){
  return res.send(`The name of this instructor is ${req.params.name}`)
})

app.listen(3000, function(){
  console.log("App has started listening on port 3000")
})
