import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 64
    },
    ipAddress: {
        type: String,
        required: true,
        maxLength: 64
    },
    didSucceed: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

schema.statics.loginAttempt = function (fail, next) {
    if(fail){
        this.didSucceed = false;
        return next()
    } else {
        this.didSucceed = true;
    }
}

const Model = mongoose.model('authentication_attempts', schema)


export default Model