import UserLog from '../../models/UserLog.js'
import createDebug from 'debug'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import express from 'express'
import userLogs from '../../middleware/userLogs.js'

const debug = createDebug('assignment03:loginAttempt')
const router = express.Router()

router.post('/tokens', sanitizeBody, async (req, res) => {
    const {email} = req.sanitizedBody
    let time = new Date();
    let timeString = time.getUTCFullYear() + '/'+ ('0' + (time.getUTCMonth()+1)).slice(-2) + '/' + ('0' + time.getUTCDate()).slice(-2) + ' ' + ('0' + (time.getUTCHours())).slice(-2) + ':' + ('0' + time.getUTCMinutes()).slice(-2) + ':' + ('0' + time.getUTCSeconds()).slice(-2);
    
    let user = new UserLog();
    user.ipAddress = address.ip();
    user.username = email;
    user.createdAt = timeString;
})


export default router