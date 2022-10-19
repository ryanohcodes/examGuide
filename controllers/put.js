
const Answer = require("../models/Answer");
const UsersCopy = require("../models/UsersCopy");

module.exports = {
    updateAnswer: async (req, res) => {
        try {
          await UsersCopy.findOneAndUpdate({_id: req.params.id},{
            selected: req.body.answer,
            completed: true,
            correct: false,
          });
          const question = await UsersCopy.findOne({_id: req.params.id})
          const result = await Answer.find({answerTo: question.TestQuestion,
            answer: req.body.answer,
          })
          if(result.length > 0){
            await UsersCopy.findOneAndUpdate({_id:req.params.id},{correct: true})
          }
          console.log('Answer has been added!');
          console.log('The completed has been set to true')
          res.redirect('/exam');
        } catch (err) {
          console.log(err);
        }
      },
};