import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://f2.toyhou.se/file/f2-toyhou-se/images/38109973_cc7LzOANW48pVU2.jpg"
  },
  version:{
    type: Number
  },
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  
})

const Game = mongoose.model('Game', GameSchema)

export default Game