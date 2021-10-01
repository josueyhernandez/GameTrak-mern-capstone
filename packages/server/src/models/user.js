import mongoose from 'mongoose'
import { Game } from '.'
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "./profile.jpg"
  },
  games: [
    {
      type: ObjectId,
      ref: "Game"
    }
  ],
  
})

const User = mongoose.model('User', UserSchema)

export default User
