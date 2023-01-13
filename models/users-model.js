const mongoose = require('mongoose')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')
const config = require('config')



const userSchema = new mongoose.Schema({
    username : {
        type:String,
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
    },
    role:{
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean
    }
   
})

userSchema.methods.generateAuthToken =function () {
    const token = Jwt.sign({id: this._id, isAdmin: this.isAdmin , role: this.role},config.get('JwtPrivateKey')) 
    return token
}

const User = mongoose.model('User' , userSchema )


function Validate(user) {
    const schema=Joi.object({ 
        username:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).email().required(),
        password:Joi.string().min(3).max(255).required(),
        role:Joi.string().required()
    })
 
   return schema.validate(user) 
}

exports.userSchema=userSchema
exports.Validate=Validate
exports.User=User
