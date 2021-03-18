import Student from '../models/Student.js'
import express from 'express'
import authUser from '../middleware/authUser.js'
import authAdmin from '../middleware/authAdmin.js'
import sanitizeBody from '../middleware/sanitizeBody.js'

const router = express.Router()

router.get('/', authUser, async (req, res) => {
    let students = await Student.find() 
    res.send({data: students})
})

// GET
router.get('/:studentId', authUser, async (req, res) => {
    try{
    let student = await Student.findById(req.params.studentId)
    if(!student) throw new Error("Resource not found")
    res.send({data: student})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

//POST
router.post('/', sanitizeBody, authUser, authAdmin, async (req, res) => {
    const newStudent = new newStudent(req.sanitizedBody)
    await newStudent.save()
    res.status(201).send({data: newStudent})
})


// PUT
router.put('/:studentId', sanitizeBody, authUser, authAdmin, async (req, res) => {
    try {
        const {_id, ...otherAttributes} = req.sanitizedBody
        const student = await Student.findByIdAndUpdate(
            req.params.studentId,
            {_id: req.params.studentId, ...otherAttributes},
            {
              new: true,
              overwrite: true,
              runValidators: true
            }
          )
          if (!student) throw new Error('Resource not found')
          res.send({data: student})
    } catch (err) {
        sendResourceNotFound(req, res)
    }

})

// PATCH
router.patch('/:studentId', sanitizeBody, authUser, authAdmin, async (req, res) => {
    try{
    const {_id, ...otherAttributes} = req.sanitizedBody
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.studentId,
        {_id: req.params.studentId, ...otherAttributes},
        {
            new: true,
            runValidators: true
        }
    )
    if(!updatedStudent) throw new Error('Resource not found')
    res.send({data: updatedStudent})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

// Delete
router.delete('/:studentId', authUser, authAdmin, async (req, res) => {
    try{
        const student = await Student.findByIdAndRemove(req.params.studentId)
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch (err){
        sendResourceNotFound(req, res)
    }

})

function sendResourceNotFound (req, res){
      res.status(404).send({
        errors: [
          {
            status: '404',
            title: 'Resource does not exist',
            description: `We could not find a course with this id`
          }
        ]
      })
    }

export default router