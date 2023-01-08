const Joi = require('joi')
const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Genre,Validate} = require('../models/genres-model')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')




//get all data
router.get('/',[auth,admin], async (req,res)=>{
    const genre = await Genre.find()
    res.send(genre)
    res.end()
})


//get single data
router.get('/:id' , async (req,res)=>{
 const genre = await Genre.findById(req.params.id)
 if(!genre){
    res.status(404).send('genres not find')
 }
 res.send(genre)
 res.end()
})

//post data
router.post('/' , async (req,res)=>{

    const { error } =Validate (req.body)

    if(error){
        return  res.status(400).send(error.details[0].message)
       }

  let genre = new Genre ({ name:req.body.name})
  genre = await genre.save()
  res.send(genre)
  res.end()
})


//update data
router.put('/:id', async (req,res)=>{

    const {error} = Validate(req.body)

    if(error){
     return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id ,{ name: req.body.name},{new:true})
    if(!genre){
        return  res.status(404).send('genres not find by the given id')
    }
    
   res.send(genre)
   res.end()
})



//remove data
//update data
router.delete('/:id', async (req,res)=>{

    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre){
        return  res.status(404).send('genre not find by the given id')
    }
    
   res.send(genre)
   res.end()
})



module.exports=router