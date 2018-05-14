//create schema
const instructorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    isHilarious: {type: Boolean, default: true},
    favouriteColors: [String]
  },
  { timestamps: true}
)

//Create model from schema to perform CRUD actions
const Instructor = mongoose.model("Instructor", instructorSchema)

//export for use with other modules
module.exports = Instructor
