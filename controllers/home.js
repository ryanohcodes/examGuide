const TestQuestion = require('../models/TestQuestion')
const Submitted = require("../models/Submitted")
const UsersCopy = require('../models/UsersCopy');
const User = require('../models/User')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  finalSubmit: async(req,res) =>{
    const results = await UsersCopy.find({user:req.user.id, session: req.user.session})
    await User.findOneAndUpdate({_id:req.user.id},{
      $inc: { session: 1 },
    })
    const correct = await UsersCopy.find({user: req.user.id,
      session: req.user.session, correct:true
    })
    const total = Math.floor(100*(correct.length/results.length))
    res.render('final.ejs',{results:results, total:total, examNumber:req.user.session})
  },
  reviewProblem: async(req,res) =>{
    const problem = await UsersCopy.findById(req.params.id)
    res.render("again.ejs", {bank:problem, sess:req.user.session})
    return
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
      const sess = req.user.session
      const done = await UsersCopy.find({
        user: req.user.id,
        completed: true,
        session: sess, 
    })
      const usersQuestions1 = await UsersCopy.find({completed: false})

      if(questions.length === done.length){
        res.redirect('/completed')
        return
      }
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

      res.render("exam.ejs",{bank:usersQuestions,sess:sess});
      return
    }catch(err){
      console.log(err)
    }
  },
  getReview:(req,res)=>{
    const totalExams = req.user.session
    res.render("review.ejs",{totalExams:totalExams});
  },
  getOldExam: async(req,res) =>{
    const exam = await UsersCopy.find({session:req.params.id, user: req.user.id})
    const correct = await UsersCopy.find({user: req.user.id,
      session: req.params.id, correct:true
    })
    console.log(exam.length)
    console.log(correct.length)
    const total = Math.floor(100*(correct.length/exam.length))
    res.render('oldExam.ejs',{results:exam,total:total})
  }
};
