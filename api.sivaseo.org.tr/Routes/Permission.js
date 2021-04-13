const express = require('express')
const router = express.Router()
const Permission = require('../Models/Permission')
const { permissionValidation } = require('../validation')


// get permissions list
router.get('/list', async (req, res) => {
    const permissionList = await Permission.permissionModel.find((err, permissions) => {
        if (err) return err;

        res.send(permissions)
    })
})



// new permission
router.post('/new', async (req, res) => {



    // joi validation
    const validation = permissionValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    // new permission
    const newpermission = new Permission.permissionModel({
        permission_verbose_name: req.body.permission_verbose_name,
        permission_model_name: req.body.permission_model_name,
        permission_state: req.body.permission_state
    })


    const savedpermission = newpermission.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: newpermission
            })
        }
    })

})
// new permission end

// update permission
router.put('/update/:permissionId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = permissionValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }


    // check permissionname exist
    let permissionnameExist;
    await permission.findOne({ permission_permissionname: req.body.permission_permissionname, _id: { $ne: req.params.permissionId } }, (err, result) => {
        if (result == null) {
            permissionnameExist = null
        } else {
            permissionnameExist = result
        }
    })

    if (permissionnameExist != null) {
        res.send({
            response: false,
            responseData: "Kullanıcı adı başka bir kullanıcı tarafından kullanılmaktadır!"
        })
        return false
    }

    //check email exist
    let emailExist;
    await permission.findOne({ permission_email: req.body.permission_email, _id: { $ne: req.params.permissionId }  }, (err, result) => {
        if (result == null) {
            emailExist = null
        } else {
            emailExist = result
        }
    })

    if (emailExist != null) {
        res.send({
            response: false,
            responseData: "E-posta adresi başka bir kullanıcı tarafından kullanılmaktadır!"
        })
        return false
    }


    await permission.findByIdAndUpdate(
        { _id: req.params.permissionId },
        {
            permission_name: req.body.permission_name,
            permission_permissionname: req.body.permission_permissionname,
            permission_password: req.body.permission_password,
            permission_email: req.body.permission_email,
            permission_pharmacy_id: req.body.permission_pharmacy_id,
            permission_registration_type_id: req.body.permission_registration_type_id

        }

    ,(err, updatedpermission) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedpermission
            })
        }
    })

})
// update permission


// delete permission
router.delete('/delete/:permissionId', async (req, res) => {
    await permission.deleteOne({ _id: req.params.permissionId }, (err) => {
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
// delete permission end



module.exports = router