import students from '../data/students.js'
import express from 'express'
import validateStudentId from '../middleware/validateStudentId.js'
const router = express.Router()

router.use('/:studentId', validateStudentId)

router.get('/', (req, res) => res.send({data: students}))

// GET
router.get('/:studentId', (req, res) => {
    res.send({data: students[req.studentIndex]})  
})

// POST
router.post('/', (req, res) => {
    const {firstName, lastName, nickName, email} = req.body
    const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        nickName,
        email
    }
    students.push(newStudent)
    res.status(201).send({data: newStudent})
})

// PUT
router.put('/:studentId', (req, res) => {
    const {firstName, lastName, nickName, email} = req.body
    const id = req.params.studentIndex
    const updatedStudent = {id, firstName, lastName, nickName, email}
    students[req.studentIndex] = updatedStudent
    res.send({data: updatedStudent})
})

// Patch
router.patch('/:studentId', (req, res) => {
const {id, ...Rest} = req.body
const updatedStudent = Object.assign({}, students[req.studentIndex], Rest)
students[req.studentIndex] = updatedStudent
res.send({data: updatedStudent})
})

// Delete
router.delete('/:studentId', (req, res) => {
    const deletedStudent = students.splice(req.studentIndex, 1)
    res.send({data: deletedStudent[0]})
})

export default router