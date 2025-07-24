const { Router } = require('express');
const adminRouter = Router();


adminRouter.post('/signup',(req,res)=>{
    res.send("Admin created successfully")
})

adminRouter.post('/signin',(req,res)=>{
    res.send("Admin sign in successfully")
})

adminRouter.post('/courses',(req,res)=>{
    res.send("Course created successfully")
})

adminRouter.put('/courses/:id',(req,res)=>{
    res.send("Course updated successfully")
})

adminRouter.delete('/courses/:id',(req,res)=>{
    res.send("Course deleted successfully")
})



module.exports={
    adminRouter: adminRouter
}