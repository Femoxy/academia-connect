
const {teachers} = require('../models/appModels')
const {students} = require('../models/appModels')


exports.teacherProfile = async(req,res) =>{
    try {
        const studentId = req.params.id

        const checkTeacher = await teachers.findById(studentId)

        if(!checkTeacher){
            return res.status(404).json({
                message:"Teacher not found"
            })
        }

         return res.status(200).json({
            message:'Here is your profile',
            data:checkTeacher
         })
        
    } catch(error){
        return res.status(500).json({
            message:"something went wrong "+ error.message
        })
    }
}


exports.getStudentsByClass =async(req,res)=>{
    try {
        const {classIn} = req.body
        const studentClass = await students.find({classIn:classIn});
        if(!studentClass || studentClass.length === 0){
              return res.status(404).json("No Student found in this class")
        }
        return res.status(200).json({
            message:`Here are all the students in ${classIn}`,
            data:studentClass
        })

        
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong "+ error.message
        })
    }    
}

