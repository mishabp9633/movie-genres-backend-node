const {User,Validate} = require('../models/users-model')
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router()



router.post('/' , async (req,res)=>{
    const { error } =Validate (req.body)
    if(error){
        return  res.status(400).send(error.details[0].message)
       }

      let user =  User.findOne({email:req.body.email})
      if (user) return res.status(400).send('user already registered')

        user = new User ({ 

        username:req.body.username ,
        email: req.body.email , 
        password:req.body.password 
       })
       
     await user.save()
     res.send(user)
     res.end()
})

module.exports=router