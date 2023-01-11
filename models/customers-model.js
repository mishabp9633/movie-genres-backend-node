const mongoose = require('mongoose')
const Joi = require('joi')

const Customer = mongoose.model('Customer' , new mongoose.Schema({
    name:{type:String,
          required:true,
          minlength:3,
          maxlength:50
         },
         isGold:{type:Boolean,
            default:false,
           },
           phone:{type:String,
            required:true,
            minlength:3,
            maxlength:11
           },
        
}))

//validation
function Validate(customer) {
    const schema={ 
        name:Joi.string().min(3).max(50).required(),
        isGold:Joi.boolean(),
        phone:Joi.string().min(3).max(11).required()
    }
 
   return Joi.validate(customer,schema)
}

exports.Customer=Customer
exports.Validate=Validate