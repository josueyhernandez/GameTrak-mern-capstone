import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  owner: {
    type: String,
  },
  
})

const Game = mongoose.model('Game', GameSchema)

export default Game