// Don't forget to use NPM to install Express and Mongoose.
import morgan from 'morgan'
import express from 'express'
import sanitizeMongo from 'express-mongo-sanitize'
import authRouter from './routes/auth/index.js'
// import loginAttempt from './routes/auth/loginAttempt.js'
import studentsRouter from './routes/students.js'
import coursesRouter from './routes/courses.js'
import connectDatabase from './startup/connectDatabase.js'
connectDatabase()


const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

// routes
app.use('/auth', authRouter)
// app.use('/auth/tokens', loginAttempt)
app.use('/api/students', studentsRouter)
app.use('/api/courses', coursesRouter)

export default app