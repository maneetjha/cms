const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const objectID = require('mongoose').ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
    },
    creatorID:{
        type: objectID,
        required: true
    }
});


const purchaseSchema = new Schema({
    userID: {
        type: objectID,
        required: true
    },
    courseID: {
        type: objectID,
        required: true
    },
    // purchaseDate: {
    //     type: Date,
    //     required: true
    // }
});


const UserModel = mongoose.model('User', userSchema);
const AdminModel = mongoose.model('admin',adminSchema);
const CourseModel = mongoose.model('Course', courseSchema);
const PurchaseModel = mongoose.model('Purchase', purchaseSchema);




module.exports = { UserModel, AdminModel, CourseModel, PurchaseModel };