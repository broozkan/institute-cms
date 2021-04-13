const express = require('express')
const Joi = require('joi')
const router = express.Router()
const mongoose = require('mongoose')
const PostModel = require('../Models/ModelPost')
require('dotenv/config')

router.get('/',async (req, res) => {
    
    
    

})

router.post('/new', (req, res) => {
    const validation = PostModel.validate(req.body)
    res.send(validation)
})


module.exports = router