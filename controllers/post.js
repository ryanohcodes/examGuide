
const Answer = require("../models/Answer");
const UsersCopy = require("../models/UsersCopy");

module.exports = {
    createAnswer: async (req, res) => {
        try {
          const question = await UsersCopy.findOne({_id: req.params.id})
          const result = await Answer.findOne({answerTo: question.TestQuestion})

          console.log(req.body)
          console.log(req.params)
        
          const sess = req.user.session
          //finds out how many we answer
          const done = await UsersCopy.find({
            user: req.user.id,
            completed: true,
            session: sess, 
           })

           const questionNum = done.length + 1

           // updating the question we answered
          try{
            const wow = await UsersCopy.findOneAndUpdate({_id: req.params.id},{
              selected: req.body.answer,
              completed: true,
              correct: result.answer == req.body.answer ? true : false,
              num: questionNum,
            })
            console.log(wow);
          }catch(error){
            console.log(error);
          }
        } catch (err) {
          console.log(err);
        }finally{
          res.redirect("/exam");
        }
      },
};