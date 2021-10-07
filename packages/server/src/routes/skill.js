import express from 'express'
import { Game, User, Char, AttrA, AttrB, Skill } from '../models'
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
        const newSkill = new Skill({
            name,
            type,
            description,
            game
        })
        let savedSkill = await newSkill.save()
        res.send(newSkill)
    }catch(err){
        res.send(err)
    }
})
router.get('/:id', async(req, res)=>{
    try{
        const skillList = await Skill.find({
            game: req.params.id
        })
        res.send(skillList)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;