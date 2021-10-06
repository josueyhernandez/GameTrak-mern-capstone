import express from 'express'
import { Game, User, Char } from '../models'
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
    const { character, attribute, newValue } = req.body
    try {
        let char = await Char.findOne({
            _id: character
        })
        
        
    }catch(err){
        res.send("Well")
    }
})
module.exports = router;