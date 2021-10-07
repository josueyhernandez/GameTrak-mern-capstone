import express from 'express'
import { Game, User, Char, AttrA, AttrB, Skill, Item } from '../models'
import chalk from 'chalk'
import bcrypt from 'bcryptjs'
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')
const configJWT = config.jwt.secret
const configExp = config.jwt.tokenLife
const router = express.Router();

router.post('/', async(req, res)=>{
    const {name, type, description, game} = req.body
    try{
        const newItem = new Item({
            name,
            type,
            description,
            game
        })
        let savedItem = await newItem.save()
        res.send(newItem)
    }catch(err){
        res.send(err)
    }
})
router.get('/:id', async(req, res)=>{
    try{
        const itemList = await Item.find({
            game: req.params.id
        })
        res.send(itemList)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;