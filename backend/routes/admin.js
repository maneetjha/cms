require ('dotenv').config()
const { Router } = require('express');
const adminRouter = Router();
const { AdminModel, CourseModel }=require('../database/db')
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





adminRouter.post('/courses',AdminMiddleWare,async(req,res)=>{
    const { title, description, price, imageLink} = req.body
    const creatorID = req.creatorID

    try{
        await CourseModel.create({
            title : title,
            description: description , 
            price: price , 
            imageLink: imageLink, 
            creatorID:creatorID
        })

        res.json({msg:"Course created successfully"})

    } catch(err)
    {
        res.status(400).json({msg:"Failed to add course!"})

    }
})




adminRouter.put('/courses',AdminMiddleWare,async(req,res)=>{
   const creatorID=req.creatorID
   const courseid=req.body.courseid

   const { title, description, price, imageLink } = req.body

    try{
        const iscreator = await CourseModel.findOne({
            _id:courseid, 
            creatorID:creatorID
        })
        if(iscreator){
            await CourseModel.updateOne(
            { _id:courseid },   //filter the course by it's id

            {
                $set:{                      //Using $set ensures only the specified fields are updated not the entire document.
                    title: title, 
                    description: description, 
                    price: price, 
                    imageLink: imageLink
                }
            })

            res.json(
                {msg:"Successfully updated the course"}
            )
        }
        else{
            res.status(403).json(
                {
                    msg:"You are not the creator of this course or the course does not exists!"
            })
        }

    } catch(err)
    {
        console.log(err)
        res.status(400).json({msg:"Failed to update course!"})

    }
}) 





adminRouter.delete('/courses/:id',AdminMiddleWare,async(req,res)=>{
    const creatorID=req.creatorID
    const courseid=req.params.id

        try{
            const iscreator = await CourseModel.findOne({
                _id:courseid, 
                creatorID:creatorID
            })
            if(iscreator){
                const result=await CourseModel.deleteOne({
                    _id:courseid, 
                    creatorID:creatorID
                });

                if (result.deletedCount === 0) {
                    return res.status(400).json({ msg: "Course not deleted" });
                }

                return res.json({ msg: "Successfully deleted the course" });

            }
            else{
                res.status(403).json(
                    {
                        msg:"Can't delete the course"
                    }
                )
            }

        } catch(err)
        {   console.log(err)
            res.status(400).json({msg:"Failed to update course!"})

        }
})



module.exports={
    adminRouter: adminRouter
}