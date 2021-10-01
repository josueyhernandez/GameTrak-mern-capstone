const jwt = require('jsonwebtoken');
const config = require('config');
import { User } from '../models'

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg: 'No token'})
    }

    try{
        const userToken = token.replace("Bearer ", "")
        jwt.verify(userToken, config.jwt.secret, (error, payload) => {
            if (error) {
                return res.status(401).json({msg: 'No token'})
            }
            const { id } = payload
            User.findById(id).then((data) => {
                req.user = data
                next()
            })
        })
        next()
    }catch(err){
        res.send("Token is not valid")
    }
}