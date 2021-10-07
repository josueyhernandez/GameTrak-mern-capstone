import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unnamed Place"
  },
  type: {
    type: String,

  },
  description: {
    type: String
  },
  game: {
    type: ObjectId,
    ref: 'Game',
  },


})

const Place = mongoose.model('Place', PlaceSchema)

export default Place