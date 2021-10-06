import express from 'express'
import { Game, User, Char, AttrA, AttrB } from '../models'
import chalk from 'chalk'
import bcrypt from 'bcryptjs'
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')
const configJWT = config.jwt.secret
const configExp = config.jwt.tokenLife
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let charList = await Char.find({
            game: req.params.id
        })
        res.send(charList)
    } catch (err) {
        res.send(err)
    }

})
router.get('/character/:id', async (req, res) => {
    try {
        let char = await Char.findOne({
            _id: req.params.id
        })
        res.send(char)
    } catch (err) {
        res.send(err)
    }
})
router.post('/', async (req, res) => {
    const { name, image, game, description } = req.body
    try {
        let char = new Char({
            name,
            game,
            description,
            image

        })
        let savedChar = await char.save()
        res.send(savedChar)
    } catch (err) {
        res.send(err)
    }
})
router.put('/change-attribute', async (req, res) => {
    const { attribute, newValue } = req.body
    try {
        // let char = await Char.findOne({
        //     $in: [ attribute,  attributes]
        // })
        // compare char._id to character
        // if those don't match send error and end function
        let attrA = await AttrA.findOne({
            _id: attribute
        })
        let attrB = await AttrB.findOne({
            _id: attribute
        })
        
        if (attrA) {
            //update A
            let newAttr = await AttrA.findOneAndUpdate({
                _id: attribute
            },
            {
                $set:{value: newValue}
            },
            )
            res.send(newAttr)
            // find one and update ({find by id}, {update value}, {new true})
        } else if (attrB) {
            let newAttr = await AttrB.findOneAndUpdate({
                _id: attribute
            },
            {
                $set:{value: newValue}
            },
            )
            res.send(newAttr)
            //update b
        } else {
          res.send(false)
        }

        // find attribute and update information

        // send back updated information 
        
        
    }catch(err){
        res.send(err)
    }
})
module.exports = router;