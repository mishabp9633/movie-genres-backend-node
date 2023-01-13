const {Owner,Validate} = require('../models/owner-model')
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

      let owner = await Owner.findOne({ email:req.body.email })
      if (owner) return res.status(400).send('Owner already registered')



      owner = new Owner (
        _.pick(req.body,['username','email','password','role','proof'])
        // username:req.body.username ,
        // email: req.body.email , 
        // password:req.body.password 
       )
       const salt = await bcrypt.genSalt(10)
       owner.password = await bcrypt.hash(owner.password , salt)
       
     await owner.save()

        const token = owner.generateAuthToken()
        // console.log(token);
    //  const token = Jwt.sign({id: user._id},config.get('JwtPrivateKey'))
        res.header('x-auth-token',token).send(_.pick(owner,['_id','username','email','role','proof']))

      //without lodash
    //  res.send(
    //   user.username,
    //   user.email
    //   )

     res.end()
})

module.exports=router