const TestQuestion = require('../models/TestQuestion')
const Submitted = require("../models/Submitted")
const UsersCopy = require('../models/UsersCopy');

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  finishedExam: async (req,res)=>{
    try{
      const results = await UsersCopy.find({user: req.user.id,
        session: req.user.session
      })
      res.render("completed.ejs", {results:results})
      return
    }catch(err){
      console.log(err)
    }
    
  },
  getProfile:(req,res)=>{
    res.render("profile.ejs");
  },
  getExam: async (req,res)=>{
    try{
      const questions = await TestQuestion.find()
      const usersQuestions1 = await UsersCopy.find({completed: false})
      const done = await UsersCopy.find({completed: true})
      const sess = req.user.session

      if(usersQuestions1.length < 1){
        for(let i = 0; i < questions.length;i++){
          await UsersCopy.create({
            session: sess,
            TestQuestion: questions[i].id,
            question: questions[i].question,
            a: questions[i].a,
            b: questions[i].b,
            c: questions[i].c,
            d: questions[i].d,
            user: req.user.id,
            completed: false,
            selected: false 
          })
        }
      }
      const usersQuestions = await UsersCopy.find({completed: false})

      if(questions.length === done.length){
        res.redirect('/completed')
        return
      }
      res.render("exam.ejs",{bank:usersQuestions,sess:sess});
      return
    }catch(err){
      console.log(err)
    }
  },
  getReview:(req,res)=>{
    res.render("review.ejs");
  }
};