const  {schools, students} = require('../models/appModels'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async(req, res)=>{
    try {
        const {teacherName, password, email, phone, address} = req.body
        const teacher =  await schools.findOne({email: email})
        if(teacher){
            return res.status(200).json({
                message: "School already registered"
            })
        }
        const salt =  bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);
        
        const management = new schools({
            teacherName, 
            password: hashPassword, 
            email, 
            phone,
            address
        })
       
        await management.save();
        return res.status(200).json({
            message:"SignUp successfull",
            data:management
        })
        
    } catch (error) {
        return res.send('An error occur '+error.message)
    }
}

const logIn = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const checkTeacher = await schools.findOne({email})
        if(!checkTeacher){
            return res.status(401).json({
              message:'User not found',
            });
          }
        const checkPassword = bcrypt.compareSync(password, checkTeacher.password)
        if(!checkPassword){
            return res.status(200).json({
                message: "Incorrect password or email"
            })
        }  
        const token = jwt.sign({
            teacherId:checkTeacher._id,
            email:checkTeacher.email
        }, process.env.secret, {expiresIn:'30mins'})

        await checkTeacher.save();
        return res.status(200).json({
            message:"Login successfully",
            token 
        })
          
    } catch (error) {
        return res.status(500).send("somthing went wrong")
    }
    
}

const createStudent = async (req,res)=>{
    try {
        const {fullName, address, dob, gender, classIn, guardianPhone, guardianEmail} = req.body
        
        const student = await students.findOne({guardianEmail: guardianEmail})
        if(student){
            return res.status(200).json({
                message: "This email already registered a student"
            })
        }
        const newStudent = new students.create({
            fullName, 
            address, 
            dob, 
            gender,
            classIn, 
            guardianPhone, 
            guardianEmail
        })
        // const token = jwt.sign({
        //     studentId:newStudent.studentId,
        //     guardianEmail
        // })
        
        await newStudent.save();
        newStudent.studentData.push(newStudent._id)
        await student.save()
        return res.status(200).json({
            message:"student registered successfully",
            data: newStudent
        })
    } catch (error) {
        return res.status(500).json({
            error:'Internal server error ' +error.message
        })
    }
}

const getOneStudent = async(req, res)=>{
    try {
        const studentId = req.params.id
        const checkStudent = await schools.findById(studentId)
        if(!checkStudent){
            return res.status(404).json({
                message:"Student not found"
            })
        }
        return checkStudent
        
    } catch (error) {
        return res.status(500).json({
            message:"something went wrong "+ error.message
        })
    }
}

const studentByClass = async(req,res)=>{
    try {
        const {classIn} = req.body
        const studentClass = await students.findOne({classIn:classIn});
        if(!studentClass || studentClass.length === 0){
              return res.status(404).json("No Student found in this class")
        }
        return res.status(200).json(studentClass)

        
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong "+ error.message
        })
    }
}


module.exports ={
    signUp,
    logIn,
    createStudent,
    getOneStudent,
    studentByClass
}