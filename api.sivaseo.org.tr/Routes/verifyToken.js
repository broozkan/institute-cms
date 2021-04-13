const jwt = require('jsonwebtoken')



const auth = (req, res, next) => {



    const token = req.header('auth-token')

    if (!token) {

        res.status(401).send({
            response: false,
            responseData: ""
        })
        return false
    }


    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.send({
            response: false,
            responseData: err.message
        })
    }

}

module.exports = auth