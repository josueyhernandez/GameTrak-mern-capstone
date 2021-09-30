import express from 'express'
import { User } from '../models'
import chalk from 'chalk'
import bcrypt from 'bcryptjs'
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')
const configJWT = config.jwt.secret
const configExp = config.jwt.tokenLife
const router = express.Router();
// router.
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const userFound = await User.findOne({ username })
        const passCompare = await bcrypt.compare(password, userFound.password)
        console.log(config.jwt.secret)
        if(passCompare && userFound){
            res.send(
                {
               valid: passCompare, 
               user: userFound
            })
        } else{
            res.send({
                valid: false
            })
        }
    }catch(err){
        res.send(err)
    }
})
router.post('/', async (req, res) => {
    const { username, password, email } = req.body
    console.log(chalk.blue('round 1'))
    const superPassword = await bcrypt.hash(password, 12)
    try {
        const userExists = await User.findOne({ username })
        const emailExists = await User.findOne({ email })
        console.log(chalk.blue('round 2'))


        if (!userExists && !emailExists) {
            const user = new User({
                username,
                password: superPassword,
                email,
            })
            const savedUser = await user.save()
            console.log(chalk.blue('round 3'))
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
                        res.json({token})
                    }
                }
                )
                console.log(chalk.blue('round 4'))
        } else {
            res.status(409).json(409)
        }
    } catch (err) {
        res.status(406).send(406)
    }
})
module.exports = router;