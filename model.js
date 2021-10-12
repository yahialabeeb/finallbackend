const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramingSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique:true
  },
  fav: {
    type: Array,
    required: true
  },

});

// This creates our model from the above schema, using mongoose's model method
const ProgramingModal = mongoose.model("ProgramingModal", ProgramingSchema);

// Export the Article model
module.exports = ProgramingModal;