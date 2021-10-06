import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const AttrASchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unknown Attribute"
  },
  value:{
      type: String,
      default: ""
  },
  game: {
    type: ObjectId,
    ref: 'Game',
  },
  owned:{
    type: Boolean,
    default: "false"
  }
  
 
})

const AttrA = mongoose.model('AttrA', AttrASchema)

export default AttrA