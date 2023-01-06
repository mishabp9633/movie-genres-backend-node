const {User} = require('../models/users-model')
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const config = require('config')



router.post('/' , async (req,res)=>{
    const { error } = Validate (req.body)
    if(error){
        return  res.status(400).send(error.details[0].message)
       }

    //    user = new User (
    //     _.pick(req.body,['email','password']))

      let user = await User.findOne({ email:req.body.email })
      if (!user) return res.status(400).send(' Oops Invalid email... ')

      const validpassword = await bcrypt.compare (req.body.password , user.password )
      if (!validpassword) return res.status(400).send(' Oops Invalid password... ')
       
      //token creation
      const token = Jwt.sign({id: user._id},config.get('JwtPrivateKey'))
    
     res.send(token)
     res.end()
})

function Validate(req) {
    const schema={ 
        email:Joi.string().min(3).max(255).email().required(),
        password:Joi.string().min(3).max(255).required()
    }
 
   return Joi.validate(req,schema) 
}


module.exports=router