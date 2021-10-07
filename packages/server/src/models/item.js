import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unnamed Item"
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

const Item = mongoose.model('Item', ItemSchema)

export default Item