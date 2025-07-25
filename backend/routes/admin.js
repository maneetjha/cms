require ('dotenv').config()
const { Router } = require('express');
const adminRouter = Router();
const { AdminModel }=require('../database/db')
const AdminMiddleWare = require('../middleware/AdminMiddleWare.js')
const bcrypt = require('bcrypt')
const { z } = require('zod')
const jwt = require('jsonwebtoken')



const adminschema= z.object({
    email:z.string().email(),
    name:z.string().min(2).max(30),
    password:z.string().min(6)
});



adminRouter.post('/signup',async(req,res)=>{
    const { name, email, password }= req.body
    const result = adminschema.safeParse(req.body);

    if(!result.success){
        const error =result.error.issue[0].message
        res.status(400).json({msg:error})
    }

    const hashedPassword = await bcrypt.hash(password,5); //error not handled

    try{
        await AdminModel.create({
            email:email,
            name:name,
            password:hashedPassword
        })
        res.json(
                { msg: 'User created successfully' }
        );
    } catch(err){
        res.json(
                { msg: 'Username already exists' }
        );
    }
});


adminRouter.post('/signin',async (req,res)=>{
    const { email, password } = req.body;
    const admininfo= await AdminModel.findOne({email:email})

    if(admininfo){
        const ispasswordcorrect=await bcrypt.compare(password,admininfo.password)

        if(ispasswordcorrect){
            const token = jwt.sign(
                { id:admininfo._id }, process.env.JWT_ADMIN
            );
            res.json({token : token})
        }

        else{
            res.status(400).json({ msg: "Invalid credentials"})
        }

    }
    else{
        return res.status(400).json({ msg: 'User not found' });
    }
})





adminRouter.post('/courses',AdminMiddleWare,(req,res)=>{
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