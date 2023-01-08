const {User,Validate} = require('../models/users-model')
const mongoose = require('mongoose')
// const Joi = require('joi')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')




router.post('/' , async (req,res)=>{
    const { error } =Validate (req.body)
    if(error){
        return  res.status(400).send(error.details[0].message)
       }

      let user = await User.findOne({ email:req.body.email })
      if (user) return res.status(400).send('user already registered')



        user = new User (
        _.pick(req.body,['username','email','password'])
        // username:req.body.username ,
        // email: req.body.email , 
        // password:req.body.password 
       )
       const salt = await bcrypt.genSalt(10)
       user.password = await bcrypt.hash(user.password , salt)
       
     await user.save()

        const token = user.generateAuthToken()
        // console.log(token);
    //  const token = Jwt.sign({id: user._id},config.get('JwtPrivateKey'))
        res.header('x-auth-token',token).send(_.pick(user,['_id','username','email']))

      //without lodash
    //  res.send(
    //   user.username,
    //   user.email
    //   )

     res.end()
})

module.exports=router