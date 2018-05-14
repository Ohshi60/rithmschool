const mongoose = require('mongoose')

//show queries in console
mongoose.set("debug", true)
//Use es2015 promises instead of callbacks
mongoose.Promise = global.Promise

//connecting to the db
mongoose
  .connect("mongodb://localhost/first-db", {
    useMongoClient: true //This is necesarry for Mongoose version 4 and up
  })
  .then(() => {
    //once connected we give a success message
    console.log('Succesfully connected')
  })
  .catch(err => {
    console.log(err)
  })
