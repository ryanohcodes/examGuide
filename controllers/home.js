const TestQuestion = require('../models/TestQuestion')
const UsersCopy = require('../models/UsersCopy');
const User = require('../models/User')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  increaseExam: async(req,res) =>{
    await User.findOneAndUpdate({_id:req.user.id},{
      $inc: { session: 1 },
    })
    res.redirect(`/past/${req.params.exam}`)
  },
  finalSubmit: async(req,res) =>{
    const results = await UsersCopy.find({user:req.user.id, session: req.user.session}).sort({num : 1})
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
      }).sort({num : 1})
      const examNumber = req.user.session
      res.render("completed.ejs", {results:results,examNumber:examNumber})
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
      //need to compare with current done
      const questions = await TestQuestion.find()
      const sess = req.user.session
      //gets done questions
      const done = await UsersCopy.find({
        user: req.user.id,
        completed: true,
        session: sess, 
       })
       console.log(req.user.id)
       //does the user have their own copy
      // const usersQuestions1 = await UsersCopy.find({
      //   user: req.user.id,
      //   completed: false,
      //   session: sess, 
      //  })
       const totalQuestions = questions.length;
       console.log(questions.length)
       console.log(done.length)
      if(questions.length === done.length){
        res.redirect('/completed')
        return
      }
      else if(done.length < 1){
          for(let i = 0; i < questions.length;i++){
            const newQuestions = await UsersCopy.create({
              session: sess,
              TestQuestion: questions[i].id,
              question: questions[i].question,
              a: questions[i].a,
              b: questions[i].b,
              c: questions[i].c,
              d: questions[i].d,
              user: req.user.id,
              completed: false,
              selected: false,
              correct: false,
              num: 0,
            })
          }
      }
      number = done.length + 1
      const usersQuestions2 = await UsersCopy.find({
            user: req.user.id,
            completed: false,
            session: sess, 
      })
      console.log(usersQuestions2);
      res.render("exam.ejs",{bank:usersQuestions2,sess:sess,number:number});
      
    }catch(err){
      console.log(err)
    }
  },
  getReview:(req,res)=>{
    const totalExams = req.user.session
    res.render("review.ejs",{totalExams:totalExams});
  },
  getOldExam: async(req,res) =>{
    const exam = await UsersCopy.find({session:req.params.id, user: req.user.id}).sort({num : 1})
    const correct = await UsersCopy.find({user: req.user.id,
      session: req.params.id, correct:true
    })
    console.log(exam.length)
    console.log(correct.length)
    const total = Math.floor(100*(correct.length/exam.length))
    res.render('oldExam.ejs',{results:exam,total:total, examNumber:req.params.id})
  }
};
