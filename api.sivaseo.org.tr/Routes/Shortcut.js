const express = require('express')
const router = express.Router()
const Shortcut = require('../Models/Shortcut')
const { shortcutValidation } = require('../validation')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')
const multer = require('multer')
const upload = multer()

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



// new shortcut
router.post('/new', MultipartyMiddleware, async (req, res) => {
    
    console.log(req.files);
    const tmp_path = req.files.file.path
    const target_path =  './public/images/' + req.files.file.name

    fs.rename(tmp_path, target_path, (err) => {
        if(err){
            res.send({
                response: false,
                responseData: err
            })
            return
        }

        fs.unlink(tmp_path, () => {
            if(err){
                res.send({
                    response: false,
                    responseData: err
                })
                return
            }

        })

    })


    req.body = JSON.parse(req.body.data)
    console.log(req.body);
    console.log(req.body.shortcut_model_name);
    


    // joi validation
    const validation = shortcutValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    // new shortcut
    const newShortcut = new Shortcut({
        shortcut_name: req.body.shortcut_name,
        shortcut_model_name: req.body.shortcut_model_name,
        shortcut_url: req.body.shortcut_url,
        shortcut_image: req.body.shortcut_image,
        is_shortcut_open_in_new_tab: req.body.is_shortcut_open_in_new_tab
    })





    const savedShortcut = newShortcut.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newShortcut
            })
        }
    })

})
// new shortcut end

// update shortcut
router.put('/update/:shortcutId', MultipartyMiddleware, async (req, res) => {
    
    const tmp_path = req.files.file.path
    const target_path =  './public/images/' + req.files.file.name

    fs.rename(tmp_path, target_path, (err) => {
        if(err){
            res.send({
                response: false,
                responseData: err
            })
            return
        }

        fs.unlink(tmp_path, () => {
            if(err){
                res.send({
                    response: false,
                    responseData: err
                })
                return
            }

        })

    })


    req.body = JSON.parse(req.body.data)


    // joi validation
    const validation = shortcutValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    await Shortcut.findByIdAndUpdate(
        { _id: req.params.shortcutId },
        {
            shortcut_name: req.body.shortcut_name,
            shortcut_model_name: req.body.shortcut_model_name,
            shortcut_url: req.body.shortcut_url,
            shortcut_image: req.body.shortcut_image,
            is_shortcut_open_in_new_tab: req.body.is_shortcut_open_in_new_tab
        }

        , (err, updatedShortcut) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedShortcut
                })
            }
        })

})
// update shortcut


// delete shortcut
router.delete('/delete/:shortcutId', async (req, res) => {
    await Shortcut.deleteOne({ _id: req.params.shortcutId }, (err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: "Başarılı"
            })
        }
    })

})
// delete shortcut end



module.exports = router