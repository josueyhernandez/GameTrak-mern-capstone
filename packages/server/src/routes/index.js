import express from 'express'
import { User } from '../models'
import userRouter from './users'
import gameRouter from './games'
import authRouter from './auth'
import charsRouter from './chars'
import uploadRouter from './upload'
import attrRouter from './attr'

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
router.use('/users', userRouter)
router.use('/games', gameRouter)
router.use('/auth', authRouter)
router.use('/chars', charsRouter)
router.use('/upload', uploadRouter)
router.use('/attr', attrRouter)
module.exports = router
