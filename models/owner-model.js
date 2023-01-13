const mongoose = require('mongoose')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')
const config = require('config')

const ownerSchema = new mongoose.Schema({
            username: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            password: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 1025
            },
            email : {
                type:String,
                unique:true,
                required:true,
                minlength:3,
                maxlength:255
            },
    proof: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    }
})

ownerSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign({ id: this._id, role:this.role }, config.get('JwtPrivateKey'))
    return token
}

const Owner = mongoose.model('Owner', ownerSchema)


function Validate(owner) {
    const schema = Joi.object({
        proof: Joi.string().required(),
        username:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).email().required(),
        password:Joi.string().min(3).max(255).required(),
        role:Joi.string().required()
        
    })

    return schema.validate(owner)
}


exports.Validate = Validate
exports.Owner = Owner
