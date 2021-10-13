import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const CharSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unknown Person"
  },
  image: {
    type: String,
    default: "https://i.ibb.co/4WVNh0X/character-default.jpg"
  },
  game: {
      type: ObjectId,
      ref: 'Game',
  },
  description:{
      type: String
  },
  attributes: [
    {
      type: ObjectId,
      ref: ["AttrA", "AttrB"]
    },

  ],
  
  
})

const Char = mongoose.model('Char', CharSchema)

export default Char