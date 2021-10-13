import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://i.ibb.co/JCmm9zr/newgame.jpg"
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