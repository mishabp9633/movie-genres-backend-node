const {Customer,Validate} = require('../models/customers-model')
const Joi = require('joi')
const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')



//get all data
router.get('/', async (req,res)=>{
    const customer = await Customer.find()
    res.send(customer)
    res.end()
})


//get single data
router.get('/:id' , async (req,res)=>{
 const customer = await Customer.findById(req.params.id)
 if(!customer){
    res.status(404).send('customer not find by the given id')
 }
 res.send(customer)
 res.end()
})

//post data
router.post('/' , async (req,res)=>{

    const { error } =Validate (req.body)

    if(error){
        return  res.status(400).send(error.details[0].message)
       }

  let customer = new Customer ({ 

     name:req.body.name ,
     isGold: req.body.isGold , 
     phone:req.body.phone 
    })
    
  customer = await customer.save()
  res.send(customer)
  res.end()
})


//update data
router.put('/:id', async (req,res)=>{

    const {error} = Validate(req.body)

    if(error){
     return res.status(400).send(error.details[0].message)
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id ,{ name: req.body.name},{new:true})
    if(!customer){
        return  res.status(404).send('customer not find by the given id')
    }
    
   res.send(customer)
   res.end()
})



//remove data
router.delete('/:id', async (req,res)=>{

    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer){
        return  res.status(404).send('customer not find by the given id')
    }
    
   res.send(customer)
   res.end()
})



module.exports=router