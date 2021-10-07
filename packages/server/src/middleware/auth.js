const jwt = require('jsonwebtoken');
const config = require('../config/keys')
import { User } from '../models'

module.exports = function(req, res, next){
    const token = req.body.token
    if(!token){
        return res.status(401).json({msg: 'No token'})
    }
    
    
    try{
        const userToken = token.replace("Bearer ", "")
        console.log(userToken)
        jwt.verify(userToken, config.jwt.secret, (error, payload) => {
            if (error) {
                return res.send(false)
            }
            const { id } = payload.user
            User.findById(id).then((data) => {
                console.log(id)
                req.user = data
                next()
            })
        })
       
    }catch(err){
        res.send("Token is not valid")
    }
}