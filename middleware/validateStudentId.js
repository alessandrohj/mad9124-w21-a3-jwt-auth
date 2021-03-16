import students from '../data/students.js'

function validateStudentId (req, res, next){
    const id = parseInt(req.params.studentId)
    const index = students.findIndex(student => student.id === id)
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
        req.studentIndex = index
      next();
    }

}

export default validateStudentId