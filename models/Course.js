import mongoose from 'mongoose'
import {Student} from './index.js'


const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        maxLength: [16, "Code is too long"]
    },
    title:  {
        type: String,
        required: true,
        maxLength: [255, "Title is too long"]
    },
    description:  {
        type: String,
        required: false,
        maxLength: [2048, "Description is too long"]
    },
    url:  {
        type: String,
        required: false,
        maxLength: [512, "URL is too long"]
    },
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: false}]
  })

const Model = mongoose.model('Course', schema)

module.exports = Model