const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
import { Game, User, Char, AttrA, AttrB } from '../models'
router.post('/',auth, async (req, res)=>{
     try{
         const user = await User.findById(req.user.id).select("-password")
         res.send(user)
     }catch(err){
         res.send("Oh crap")
     }
    
    })
module.exports = router