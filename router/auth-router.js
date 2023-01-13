const { User } = require('../models/users-model')
const { Owner } = require('../models/owner-model')
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')




// router.post('/' , async (req,res)=>{
//     const { error } = Validate (req.body)
//     if(error){
//         return  res.status(400).send(error.details[0].message)
//        }

//     //    user = new User (
//     //     _.pick(req.body,['email','password']))

//       let user = await User.findOne({ email:req.body.email })
//       if (!user) return res.status(400).send(' Oops Invalid email... ')


//       let owner = await Owner.findOne({ email:req.body.email })
//       if (!owner) return res.status(400).send(' Oops Invalid email... ')

//       const validpassword = await bcrypt.compare (req.body.password , user.password )
//       if (!validpassword) return res.status(400).send(' Oops Invalid password... ')

//       //token creation
//          const token = user.generateAuthToken()
//     //   const token = Jwt.sign({id: user._id},config.get('JwtPrivateKey'))
//     // console.log(token);
//      res.send(token)
//      res.end()
// })

// function Validate(req) {
//     const schema=Joi.object({ 
//         email:Joi.string().min(3).max(255).email().required(),
//         password:Joi.string().min(3).max(255).required()
//     })

//    return schema.validate(req) 
// }


// module.exports=router



router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    if (await User.findOne({ email: req.body.email })) {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send(' Oops Invalid email... ')
        } else {
            //token creation
            const token = user.generateAuthToken()
            res.send(token)
            res.end()
        }

    }
    if (await Owner.findOne({ email: req.body.email })) {
        let owner = await Owner.findOne({ email: req.body.email })
        if (!owner) {
            return res.status(400).send(' Oops Invalid email... ')
        }
        else {
            //token creation
            const token = owner.generateAuthToken()
            res.send(token)
            res.end()
        }
    }

})

function Validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(3).max(255).required()
    })

    return schema.validate(req)
}

module.exports = router