import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const CharSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  game: {
    type: String,
  },
  description:{
      type: String
  }
  
})

const Char = mongoose.model('Char', CharSchema)

export default Char