import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
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
  
})

const User = mongoose.model('User', UserSchema)

export default User
