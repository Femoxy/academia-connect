const {students} = require ('../models/appModels')

exports.studentProfile = async(req, res)=>{
    try {
        const studentId = req.params.id

        const checkStudent = await students.findById(studentId)

        if(!checkStudent){
            return res.status(404).json({
                message:"Student not found"
            })
        }

         return res.status(200).json({
            message:'Here is your profile',
            data:checkStudent
         })
        
    } catch(error){
        return res.status(500).json({
            message:"something went wrong "+ error.message
        })
    }
}