const express = require('express')
const router = express.Router()
const Shortcut = require('../Models/Shortcut')
const { shortcutValidation } = require('../validation')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')

// get full shortcuts
router.get('/list', async (req, res) => {
    const shortcutList = await Shortcut.find((err, shortcuts) => {
        if (err) return err;

        res.send(shortcuts)
    })
})

// get specific shortcut by id
router.get('/list/:shortcutId', async (req, res) => {
    await Shortcut.findOne({ _id: req.params.shortcutId }, (err, shortcutData) => {
        res.send(shortcutData)
    })
})




module.exports = router