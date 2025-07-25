const { Router }  = require('express');
const courseRouter = Router();
const userMiddleWare=require('../middleware/UserMiddleWare')
const { CourseModel, PurchaseModel } = require('../database/db')



courseRouter.get('/preview', async (req, res) => {          //Route to show all the courses available on website
  const courses = await CourseModel.find()
  res.json(
    {course : courses}
  )
});





courseRouter.post('/purchase',userMiddleWare, async(req, res) => {        //Route for an user to purchase the course
  const userid=req.userid;
  const courseid=req.body.courseid
  
  const ispurchased = await PurchaseModel.findOne({userID:userid, courseID:courseid})
  const iscourseavailable = await CourseModel.findOne({_id:courseid })

  console.log(iscourseavailable)

  if(ispurchased){
    res.json(
      {msg:"Course already purchased"}
    )
    return
  }
   if(!iscourseavailable){
    res.json(
      {msg:"Course doesn't exist"}
    )
    return
  } 
//implement payment thing like razorpay here
  try{ 
      await PurchaseModel.create({
      userID:userid,
      courseID:courseid
    })
    res.json(
      {msg:"Course purchased successfully"}
    )

  }catch(err){
    res.status(400).json({
      msg:"Failed to purchase course.Try again!"
    })
  }
});





module.exports={
    courseRouter: courseRouter
}