const mongoose = require('mongoose')

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
    email:  {
        type: String,
        required: true,
        maxLength: [512, "Email is too long"]
    },
    password:  {
        type: String,
        required: false,
        maxLength: [70, "Name is too long"]
    },
    isAdmin:  {
        type: Boolean,
        required: true,
        default: false
    }
  })

const Model = mongoose.model('Student', schema)

module.exports = Model