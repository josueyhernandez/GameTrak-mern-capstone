import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const AttrBSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unknown Attribute"
  },
  value:{
      type: Number
  },

  
})

const AttrB = mongoose.model('AttrB', AttrBSchema)

export default AttrB