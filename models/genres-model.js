const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema= new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:3,
        maxlength:50
       }
})

const Genre = mongoose.model('Genre', genreSchema)

//validation
function Validate(genres) {
    const schema={ 
        name:Joi.string().min(3).max(50).required()
    }
 
   return Joi.validate(genres,schema)
}

exports.genreSchema=genreSchema
exports.Genre=Genre
exports.Validate=Validate


