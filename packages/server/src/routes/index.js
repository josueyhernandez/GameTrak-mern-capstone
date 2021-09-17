import express from 'express'
import { User } from '../models'
import userRouter from './users'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('api endpoint')
})

router.get('/sample', async (req, res, next) => {

  let user = await User.findOne({}).exec();

  if (!user) {
    const newUser = new User({
      username: "Freddie",
    })
    user = await newUser.save()
  }

  res.status(200).send(user)
})
router.use('/users', userRouter);
module.exports = router
