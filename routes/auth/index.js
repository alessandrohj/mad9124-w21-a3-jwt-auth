import User from '../../models/User.js'
import UserLog from '../../models/UserLog.js'
import createDebug from 'debug'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import express from 'express'
import authUser from '../../middleware/authUser.js'
import address from 'address'


const debug = createDebug('assignment03:authRouter')
const router = express.Router()

router.post('/users', sanitizeBody, async(req,res) => {
  try{
      
        const newUser = new User(req.sanitizedBody)
        const itExists =  Boolean(await User.countDocuments({email: newUser.email}))
        if(itExists) {
            return res.status(400).send({
                errors: [
                    {
                        status: '400',
                        title: 'Validation Error',
                        description: `Email address ${newUser.email} is already registered`,
                        source: { pointer: '/data/attributes/email'}
                    }
                ]
            })
        }
        await newUser.save()
        res.status(201).send({data: newUser})
      
  } catch (err){
    debug(err)
    res.status(500).send({
        errors: [
            {
                status: '500',
                title: 'Server Error',
                description: 'Problem saving document to the database',
            }
        ]
    })
  }
})

router.get('/user/me', authUser, async (req, res) => {
    const user =  await User.findById(req.user._id)

    res.send({ data: user})
})

// Login a user and return an authentication token.
router.post('/tokens', sanitizeBody, async (req, res) => {
    // check if the payload.username is valid
    // retrieve the stored password hash
    const {email, password} = req.sanitizedBody

    const user = await User.authenticate(email, password)

    let time = new Date();
    let timeString = time.getUTCFullYear() + '/'+ ('0' + (time.getUTCMonth()+1)).slice(-2) + '/' + ('0' + time.getUTCDate()).slice(-2) + ' ' + ('0' + (time.getUTCHours())).slice(-2) + ':' + ('0' + time.getUTCMinutes()).slice(-2) + ':' + ('0' + time.getUTCSeconds()).slice(-2);

    if(!user){
        let loginAttempt = new UserLog({username: email, ipAddress: address.ip(), didSucceed: false, createdAt: timeString})
        await loginAttempt.save()

        return res.status(401).send({ errors: [
            {
                status: '401',
                title: 'Incorrect username or password.'
            }
        ]})
    }
    let loginAttempt = new UserLog({username: email, ipAddress: address.ip(), didSucceed: true, createdAt: timeString})
    await loginAttempt.save()
    res.status(201).send({data: {token: user.generateAuthToken() }})
  })


export default router