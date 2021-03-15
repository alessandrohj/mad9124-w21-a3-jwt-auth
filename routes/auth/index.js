import User from '../../models/index.js'
import createDebug from 'debug'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import express from 'express'
import authUser from '../../middleware/authUser.js'
import bcrypt from 'bcrypt'

const debug = createDebug('assignment03:authRouter')
const router = express.Router()