const mongoose = require("mongoose");

const UserCopySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  TestQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestQuestion",
  },
  session:{
    type: Number,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  correct:{
    type: Boolean,
    required: false,
  },
  selected:{
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("UserCopy", UserCopySchema);