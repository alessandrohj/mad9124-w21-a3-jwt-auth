import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: [64, "Name is too long"]
    },
    lastName:  {
        type: String,
        required: true,
        maxLength: [64, "Name is too long"]
    },
    nickName:  {
        type: String,
        required: false,
        maxLength: [64, "Name is too long"]
    },
    email:  {
        type: String,
        required: true,
        maxLength: [512, "Email is too long"]
    }
  })

const Model = mongoose.model('Student', schema)

export default Model