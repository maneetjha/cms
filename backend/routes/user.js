require ('dotenv').config();
const { Router } = require('express');
const userRouter = Router();
const { UserModel } = require('../database/db');
const UserMiddleWare = require('../middleware/UserMiddleWare');
const bcrypt = require('bcrypt');
const { z } = require ('zod');
const jwt =require('jsonwebtoken')



const userSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});





userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.issues[0].message;
    return res.status(400).json({ msg: error });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      name :name,
      email:email,
      password: hashedPassword,
    });
    res.json(
      { msg: 'User created successfully' }
    );
  } catch (err) {
    res.json(
      { msg: 'Username already exists' }
    );
  }
});



userRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_USER);
            res.json({ token });
          } else {
            res.status(400).json({ msg: 'Invalid Credentials' });
          }
        });
    })
});




userRouter.get('/purchased',UserMiddleWare, (req, res) => {
  res.send('Hello these are purchased courses');
});






module.exports={
    userRouter: userRouter
}