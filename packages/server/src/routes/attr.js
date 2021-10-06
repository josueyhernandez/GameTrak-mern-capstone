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

router.put("/to-characters", async (req, res) => {
    const { game, character, attribute } = req.body
    let attUsed
    try {
        const attAUsed = await AttrA.findOne({
            _id: attribute
        })
        const attBUsed = await AttrB.findOne({
            _id: attribute
        })
        if (attAUsed !== null) {
            attUsed = attAUsed
        } else if (attBUsed !== null) {
            attUsed = attBUsed
        }
        const charEdited = await Char.findByIdAndUpdate(
            {
                _id: character
            },
            {
                $push: { attributes: attUsed }
            },
            {
                new: true
            }
        )
        res.send(charEdited)



    } catch (err) {
        res.send(err)
    }
})
router.get('/:id', async (req, res) => {
    try {
        let typeA = await AttrA.findOne({
            _id: req.params.id
        })
        let typeB = await AttrB.findOne({
            _id: req.params.id
        })
        if(typeA){
            let info = typeA
            res.send({
                info,
                type: 1
            })
        } else if(typeB){
            let info = typeB
            res.send({
                info,
                type: 2
            })
        }else{
            res.send("You got nothing")
        }
    }catch(err){
        res.send("hey at least you got me")
    }
})
router.get('/attra/:id', async (req, res) => {
    console.log("Here", req.params)
    try {
        let attrAList = await AttrA.find({
            game: req.params.id
        })
        res.send(attrAList)
    } catch (err) {
        res.send(err)
    }
})

router.get('/attrb/:id', async (req, res) => {
    console.log("Here", req.params)
    try {
        let attrBList = await AttrB.find({
            game: req.params.id
        })
        res.send(attrBList)
    } catch (err) {
        res.send(err)
    }
})
router.post('/', async (req, res) => {
    const { name, value, game, type, owned } = req.body
    try {
        if (type === "Words") {
            let attrA = new AttrA({
                name,
                game,
                owned,
                value
            })
            let savedAttr = await attrA.save()
            res.send(attrA)
        }
        if (type === "Numbers") {
            let attrB = new AttrB({
                name,
                game,
                owned,
                value
            })
            let savedAttr = await attrB.save()
            res.send(savedAttr)
        }
    } catch (err) {
        res.send(err)
    }
})
module.exports = router;