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

    if(!user){
        let loginAttempt = new UserLog({username: email, ipAddress: address.ip(), didSucceed: false, createdAt: new Date()})
        await loginAttempt.save()

        return res.status(401).send({ errors: [
            {
                status: '401',
                title: 'Incorrect username or password.'
            }
        ]})
    }
    let loginAttempt = new UserLog({username: email, ipAddress: address.ip(), didSucceed: true, createdAt: new Date()})
    await loginAttempt.save()
    res.status(201).send({data: {token: user.generateAuthToken() }})
  })


export default router