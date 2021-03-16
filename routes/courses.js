import courses from '../data/courses.js'
import express from 'express'
import validateCourseId from '../middleware/validateCourseId.js'
const router = express.Router()

router.use('/:courseId', validateCourseId)

router.get('/', (req, res) => res.send({data: courses}))

// GET
router.get('/:courseId', (req, res) => {
    res.send({data: courses[req.courseIndex]})
})

//POST
router.post('/', (req, res) => {
    const {code, title, description, url} = req.body
    const newCourse = {
        id: Date.now(),
        code,
        title,
        description,
        url
    }
    courses.push(newCourse)
    res.status(201).send({data: newCourse})
})

// PUT
router.put('/:courseId', (req, res) => {
    const {code, title, description, url} = req.body
    const id = req.params.courseIndex
    const updatedCourse = {id, code, title, description, url}
    courses[req.courseIndex] = updatedCourse
    res.send({data: updatedCourse})
})

// Patch
router.patch('/:courseId', (req, res) => {
const {id, ...Rest} = req.body
const updatedCourse = Object.assign({}, courses[req.courseIndex], Rest)
courses[req.courseIndex] = updatedCourse
res.send({data: updatedCourse})
})

// Delete
router.delete('/:courseId', (req, res) => {
    const deletedCourse = courses.splice(req.courseIndex, 1)
    res.send({data: deletedCourse[0]})
})

export default router