import express from 'express'
import { User } from '../models'
const bcrypt = require('bcrypt')
const{check, validationResult} = require('express-validator/check')

const router = express.Router();
// router.
router.get('/',async (req,res)=> res.send("Thank you god"));
router.post('/', async (req, res)=>{
    const {username, password, email} = req.body
    const superPassword = await bcrypt.hash(password, 12)
    try {
        const userExists = await User.findOne({username});
        const emailExists = await User.findOne({email})
        

        if (!userExists ||!emailExists) {
            const user = new User({
                username,
                password: superPassword,
                email,
            })
            const savedUser = await user.save()
            res.json(savedUser.toJSON())
        }else{
            res.status(409).json("How dare you")
        }
    } catch (err) {
        res.status(406).send("Something messed up on our end.")
    }
})
module.exports = router;