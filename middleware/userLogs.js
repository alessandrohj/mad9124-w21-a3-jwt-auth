import UserLog from '../models/UserLog.js'
import createDebug from 'debug'
import address from 'address'

const debug = createDebug('assignment03:authentication_attempts')

//Register login attempt

export default function (req, res, next) {

//   convert date to YYY/MM/DD HH/MM/SS
    let time = new Date();
    let timeString = time.getUTCFullYear() + '/'+ ('0' + (time.getUTCMonth()+1)).slice(-2) + '/' + ('0' + time.getUTCDate()).slice(-2) + ' ' + ('0' + (time.getUTCHours())).slice(-2) + ':' + ('0' + time.getUTCMinutes()).slice(-2) + ':' + ('0' + time.getUTCSeconds()).slice(-2);

    const {email} = req.sanitizedBody
    let user = new UserLog();
    user.ipAddress = address.ip();
    user.username = email;
    user.createdAt = timeString;
    next()
}