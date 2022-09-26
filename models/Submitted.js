const mongoose = require("mongoose");

const SubmittedSchema = new mongoose.Schema({
  session:{
    type: Number,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  TestQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestQuestion",
  },
  selected:{
    type: String,
    required: true,
  },
  correct:{
    type: Boolean,
    required: false,
  },
  completed:{
    type: Boolean,
    required: false,
  }
});

module.exports = mongoose.model("Submitted", SubmittedSchema);