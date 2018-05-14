//handle our imports
const bodyParser= require('body-parser')
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')

//app imports
const { petRouter , ownerRouter } = require("./routes")

//globals
const app = express()

//set pug as view engine
app.set("view engine", "pug")

//apply middleware
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

//route handlers
app.use("/owners", ownerRouter)
app.use("/owners/:ownerId/pets", petRouter)
app.get("/", (req,res,next) => {
  return res.redirect("/owners")
})

//catching 404 errors and serving them back to error handler
app.use((req,res,next) => {
  const err = new Error("Not found")
  err.status = 404
  return next(err)
})

//Error handler
app.use((err,req,res,next) => {
  res.status(err.status || 500)
  return res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  })
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
