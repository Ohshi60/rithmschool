/**
For this exercise we will be building a simple application where we will store a shopping list.
You should use an array to store your items in the shopping list.

Our application should have the following routes:

GET / - this should redirect to /items
GET /items - this should render a list of shopping items.
GET /items/new - this page should render a form where a user can add an item to their shopping list, with at least name and price attributes. When the form is submitted, the browser should make a POST request to /items.
POST /items - this route should accept form data and add it to the shopping list.
**/
const express = require('express')
const bodyparser = require('body-parser')

var app = express()

app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(bodyparser.urlencoded({extended: true}))
var shoppingList = []


app.get('/', function(req,res){
  res.redirect('/items')
})

app.get('/items/new', function(req,res){
  res.render("new")
})
app.get('/items', function(req,res){
  res.render("index", {shoppingList})
})

app.post('/items', function(req,res){
  var item = req.body
  shoppingList.push(item)
  console.log("Added item")
  res.redirect('/items')
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
})
