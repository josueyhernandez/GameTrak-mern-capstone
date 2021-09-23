import express from 'express'
import { User } from '../models'
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')
const configJWT = config.jwt.secret
const configExp = config.jwt.tokenLife
const router = express.Router();
// router.
router.get('/', async (req, res) => {
    const { username, password } = req.query
    try {
        const userFound = await User.findOne({ username })
        const passCompare = await bcrypt.compare(password, userFound.password)
        console.log(config.jwt.secret)
        res.send(passCompare)
    }catch(err){
        res.send(err)
    }
})
router.post('/', async (req, res) => {
    const { username, password, email } = req.body
    const superPassword = await bcrypt.hash(password, 12)
    try {
        const userExists = await User.findOne({ username })
        const emailExists = await User.findOne({ email })


        if (!userExists && !emailExists) {
            const user = new User({
                username,
                password: superPassword,
                email,
            })
            const savedUser = await user.save()
            const payload = {
                user: {
                    id: user.id
                }
            }
            console.log(payload)
            jwt.sign(
                payload,
                configJWT,
                {
                    expiresIn: configExp
                },
                (err, token)=>{
                    if(err){
                        throw err;
                    }else{
                        console.log({token})
                        res.send(200)
                    }
                }
                )
        } else {
            res.status(409).json(409)
        }
    } catch (err) {
        res.status(406).send(406)
    }
})
module.exports = router;