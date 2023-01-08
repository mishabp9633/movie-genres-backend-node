const Jwt = require('jsonwebtoken')
const config = require('config')


 module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('accsess denied. no token provided')

    
    try {
       const decoded =  Jwt.verify(token , config.get('JwtPrivateKey'))
       req.user=decoded
       next()
    }
    catch (ex){
        res.status(402).send('invalid token')
    }
}