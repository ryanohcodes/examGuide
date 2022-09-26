const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  answerTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestQuestion",
  },
});

module.exports = mongoose.model("Answer", AnswersSchema);