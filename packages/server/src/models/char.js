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
    default: "https://i0.kym-cdn.com/entries/icons/original/000/012/448/tumblr_mfpwn7pBuf1rzi1ugo1_500.png"
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