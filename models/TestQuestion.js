const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    require: true,
  },
  b: {
    type: String,
    require: true,
  },
  c: {
    type: String,
    required: true,
  },
  d: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("TestQuestion", TestSchema);
