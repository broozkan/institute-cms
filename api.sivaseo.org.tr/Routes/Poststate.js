const express = require('express')
const router = express.Router()
const PostState = require('../Models/PostState')
const { postStateValidation } = require('../validation')


// delete object for full listing
const deleteObjectForAllListing = async (filters) => {

    // if user select to list all items delete the filter object
    await Object.keys(filters).map((key, index) => {
        if(filters[key] == "*"){
            delete filters[key]
        }
    })
    return filters
}


// get full postStates
router.get('/list', async (req, res) => {
    
    req.query = await deleteObjectForAllListing(req.query)
  
    await PostState.PostStateModel.find(req.query,(err, postStates) => {
        if (err) return err;

        res.send(postStates)
    })
})

// get specific postState by id
router.get('/list/:postStateId', async (req, res) => {
   
    await PostState.PostStateModel.findOne({ _id: req.params.postStateId }, (err, postStateData) => {
        res.send(postStateData)
    })
})


// new postState
router.post('/new', async (req, res) => {

    //req.body = req.body.formData


    // joi validation
    const validation = postStateValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    // new postState
    const newPostState = new PostState.PostStateModel({
        post_state_name: req.body.post_state_name,
        post_state_visibility: req.body.post_state_visibility
    })


    const savedPostState = newPostState.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newPostState
            })
        }
    })

})
// new postState end

// update postState
router.put('/update/:postStateId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = postStateValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await PostState.PostStateModel.findByIdAndUpdate(
        { _id: req.params.postStateId },
        {
            post_state_name: req.body.post_state_name,
            post_state_visibility: req.body.post_state_visibility
        }

    ,(err, updatedPostState) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedPostState
            })
        }
    })

})
// update postState


// delete postState
router.delete('/delete/:postStateId', async (req, res) => {
    await PostState.PostStateModel.deleteOne({ _id: req.params.postStateId }, (err) => {
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
// delete postState end



module.exports = router