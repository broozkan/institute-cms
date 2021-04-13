const express = require('express')
const router = express()
const multiparty = require('connect-multiparty')
const fs = require('fs')

const MultipartyMiddleware = multiparty({keepExtensions: true, uploadDir: './public/images'})


router.post('/upload', MultipartyMiddleware, (req, res) => {
    const tmp_path = req.files.upload.path
    const target_path =  './public/images/' + req.files.upload.name

    fs.rename(tmp_path, target_path, (err) => {
        if(err){
            res.send({
                response: false,
                responseData: err.message
            })
            return
        }

        fs.unlink(tmp_path, () => {
            if(err){
                res.send({
                    response: false,
                    responseData: err.message
                })
                return
            }

            res.send({
                response: true,
                uploaded: true,
                url: "http://localhost:8080/file/"+req.files.upload.name,
                responseData: "Başarılı"
            })
        })

    })


})


router.get('/:fileName', (req, res) => {
    const path = process.cwd()
    res.sendFile(path + '/public/images/'+req.params.fileName);
})




module.exports = router