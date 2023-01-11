//require modules
require('express-async-errors')
const mongoose = require('mongoose')
const express=require('express')
const app =express()
const genres=require('./router/genres-router')
const customers=require('./router/customer-router')
const user = require('./router/users-router')
const movie = require('./router/movies-router')
const rental = require('./router/rental-router')
const auth = require('./router/auth-router')
const config = require('config')
const fawn = require('fawn')
const dotenv= require('dotenv').config()
const error = require('./middleware/error')
 

if(!config.get('JwtPrivateKey')){
    console.log('FATEL ERROR: JwtPrivateKey is not defined...')
    process.exit(1)
}

mongoose.set('strictQuery',false )

mongoose.connect('mongodb://localhost:27017/vidly')
 .then(()=> console.log('connected to mongodb server....'))
 .catch(err=>console.error('could not connect to mongodb....', err))

//json middleware for parsing body data into json
app.use(express.json())


//default path
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movie)
app.use('/api/rentals', rental)
app.use('/api/users', user)
app.use('/api/login', auth)

//error handling
app.use(error)


//port declare
const port = process.env.PORT || 3000 ;
app.listen(port , ()=>{
 console.log(`server listening at http://localhost:${port}`);
})


// //port declare
// const port = process.env.PORT || 4000
// app.listen(port , ()=>{
//  console.log(`connecting to srever${port}`);
