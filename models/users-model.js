const mongoose = require('mongoose')
const Joi = require('joi')


const User = mongoose.model('User' , new mongoose.Schema({
    username : {
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:50
    },
    email : {
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:255
    },
    password : {
        type:String,
        required:true,
        minlength:3,
        maxlength:1025
    }
}))



function Validate(user) {
    const schema={ 
        username:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(3).max(255)
    }
 
   return Joi.validate(user,schema)
}


exports.Validate=Validate
exports.User=User