const { Router } = require('express');

const userRouter = Router();




userRouter.post('/signup', (req, res) => {
  res.send('Hello signup');
});



userRouter.post('/signin', (req, res) => {
  res.send('Hello login');
});




userRouter.get('/purchased', (req, res) => {
  res.send('Hello these are purchased courses');
});




module.exports={
    userRouter: userRouter
}