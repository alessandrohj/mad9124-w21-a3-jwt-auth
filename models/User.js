import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const secretKey = 'secretKey'
const saltRounds = 14

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
        maxLength: [512, "Email is too long"],
        unique: true
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

  schema.methods.generateAuthToken = function () {
    const payload = { uid: this._id}
    return jwt.sign(payload, secretKey, {expiresIn: '1h', algorithm: 'HS256'})
}

schema.statics.authenticate = async function (email, password){
    const user = await this.findOne({ email: email})

    const badHash = `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
    const hashedPassword = user ? user.password : badHash
    const passwordDidMatch = await bcrypt.compare(password, hashedPassword)

    return passwordDidMatch ? user : null
}

schema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, saltRounds)

    next()
})

schema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    delete obj.__v
    return obj
}

const Model = mongoose.model('User', schema)

export default Model