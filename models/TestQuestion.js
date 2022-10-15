const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  question: {
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
  completed:{
    type: Boolean,
    required: false,
  },
  num:{
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("TestQuestion", TestSchema);
