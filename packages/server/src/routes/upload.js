import express, { response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'
import { requireAuth, upload } from '../middleware'
const router = express.Router()

router
  .route('/').post(upload.single("image"),(req, res) => {
    try{
        console.log(req.file)
        res.status(200).send(req.file.filename)
    }catch(err){
        res.status(404).send("It's not working")
    }

})

  module.exports = router