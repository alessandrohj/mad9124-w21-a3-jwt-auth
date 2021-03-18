import Course from '../models/Course.js'
import express from 'express'
import authUser from '../middleware/authUser.js'
import authAdmin from '../middleware/authAdmin.js'
import sanitizeBody from '../middleware/sanitizeBody.js'

const router = express.Router()

router.get('/', authUser, async (req, res) => {
    let courses = await Course.find() 
    res.send({data: courses})
})

// GET
router.get('/:courseId', authUser, async (req, res) => {
    try{
    let course = await Course.findById(req.params.courseId)
    if(!course) throw new Error("Resource not found")
    res.send({data: course})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

//POST
router.post('/', sanitizeBody, authUser, authAdmin, async (req, res) => {
    const newCourse = new Course(req.sanitizedBody)
    await newCourse.save()
    res.status(201).send({data: newCourse})
})


// PUT
router.put('/:courseId', authUser, authAdmin, async (req, res) => {
    try {
        const {_id, ...otherAttributes} = req.sanitizedBody
        const course = await Course.findByIdAndUpdate(
            req.params.courseId,
            {_id: req.params.id, ...otherAttributes},
            {
              new: true,
              overwrite: true,
              runValidators: true
            }
          )
          if (!course) throw new Error('Resource not found')
          res.send({data: course})
    } catch (err) {
        sendResourceNotFound(req, res)
    }

})

// PATCH
router.patch('/:courseId', sanitizeBody, authUser, authAdmin, async (req, res) => {
    try{
    const {_id, ...otherAttributes} = req.sanitizedBody
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        {_id: req.params.id, ...otherAttributes},
        {
            new: true,
            runValidators: true
        }
    )
    if(!updatedCourse) throw new Error('Resource not found')
    res.send({data: updatedCourse})
    } catch(err){
        sendResourceNotFound(req, res)
    }
})

// Delete
router.delete('/:courseId', authUser, authAdmin, async (req, res) => {
    try{
        const course = await Course.findByIdAndRemove(req.params.id)
        if (!course) throw new Error('Resource not found')
        res.send({data: course})
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