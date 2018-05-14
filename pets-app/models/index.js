const mongoose = require('mongoose')

/**Database config, this can be moved to another file **/
mongoose.set("debug", true)
mongoose.Promise = global.Promise

mongoose
  .connect("mongodb://localhost/pets-app")
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(err => {
    console.error(err)
  })

exports.Pet = require('./pets')
exports.Owner =require('./owners')
