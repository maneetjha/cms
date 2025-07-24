const { Router }  = require('express');

const courseRouter = Router();



courseRouter.get('/preview', (req, res) => {
  res.send('Hello get all courses');
});

courseRouter.post('/purchase', (req, res) => {
  res.send('pay money and get course');
});





module.exports={
    courseRouter: courseRouter
}