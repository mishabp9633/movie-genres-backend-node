const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('../models/genres-model');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function Validate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0)
  })

  return schema.validate(movie);
}

exports.Movie = Movie; 
exports.Validate = Validate;