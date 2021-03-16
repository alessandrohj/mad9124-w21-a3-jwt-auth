import courses from '../data/courses.js'

function validateCourseId (req, res, next){
    const id = parseInt(req.params.courseId)
    const index = courses.findIndex(course => course.id === id)
    if (index < 0) {
      res.status(404).send({
        errors: [
          {
            status: '404',
            title: 'Resource does not exist',
            description: `We could not find a car with id: ${id}`
          }
        ]
      })
    } else {
        req.courseIndex = index
      next();
    }

}

export default validateCourseId