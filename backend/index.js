const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require ('mongoose');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

const { UserModel, AdminModel, CourseModel , PurchaseModel } = require('./db');



app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin',adminRouter)







async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
}




main();