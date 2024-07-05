const  {schoolModel, teachers, students, pickupModel} = require('../models/appModels'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async(req, res)=>{
    try {
        const {teacherName, password, email, phone, address} = req.body
        const schoolManagement =  await schoolModel.findOne({email: email})
        if(schoolManagement){
            return res.status(200).json({
                message: "School already registered"
            })
        }
        const salt =  bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);
        
        const management = new schoolModel({
            fullName, 
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
        const checkManagement = await schoolModel.findOne({email})
        if(!checkManagement){
            return res.status(401).json({
              message:'User not found',
            });
          }
        const checkPassword = bcrypt.compareSync(password, checkManagement.password)
        if(!checkPassword){
            return res.status(200).json({
                message: "Incorrect password or email"
            })
        }  
        const token = jwt.sign({
            managementId:checkTeacher._id,
            email:checkTeacher.email,
           // role: checkTeacher.role.enum['teacher']
        }, process.env.secret, {expiresIn:'30mins'})

        await checkManagement.save();
        return res.status(200).json({
            message:"Login successfully",
            token 
        })
          
    } catch (error) {
        return res.status(500).send("somthing went wrong")
    }
    
}

//Generate student pick up ID, to change after each week
const generateStudentPickupID = async (length = 7) => {
    const currentTime = new Date();
    const studentId = req.student._id
    const checkStudent = await students.findById(studentId)
    if(!checkStudent){
        return res.send('Student Identity not found')
    }
    let idDoc = await pickupModel.findOne();
  
    if (idDoc && (currentTime - idDoc.generatedAt) < 7 * 24 * 60 * 60 * 1000) {
      // Less than a week has passed, return the existing ID
      return idDoc.pickupID;
    }
  
    // Generate a new ID
    let pickupID = crypto.randomBytes(length)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  
    while (pickupID.length < length) {
      pickupID += crypto.randomBytes(1)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, '');
      pickupID = pickupID.substring(0, length);
    }
  
    // Save the new ID and update the timestamp
    if (idDoc) {
      idDoc.pickupID = pickupID;
      idDoc.generatedAt = currentTime;
      await idDoc.save();
    } else {
      idDoc = new pickupModel({ pickupID, generatedAt: currentTime });
      await idDoc.save();
      checkStudent.studentPickUpID.push(idDoc);
      checkStudent.save()
    }
  
    return pickupID;
  };
  

const createStudent = async (req,res)=>{
    try {
        const {fullName, address, dob, gender, classIn, guardianPhone, guardianEmail} = req.body
        const teacher = await schoolModel.find()
        const student = await students.findOne({guardianEmail: guardianEmail})
        if(student){
            return res.status(200).json({
                message: "This email already registered a student"
            })
        }

        //Generate student ID based on the day and the age of school owner and increment serially as new student are registered
        const year = 1634
        //Inintialized the current highest student ID
        let currentStudentID = 0;
        const generateID = ()=>{
            //Increment the current ID by 1 for the new student
            currentStudentID += 1;
            return `${year}`+ currentStudentID

        }

        

           //Function to generate alphanumeric string without weekly change
        // const generateStudentPickupID = ( length=7 ) =>{
        //    let pickupID= crypto.randomBytes(length)
        //    .toString("base64")
        //    .replace(/[^a-zA-Z0-9]/g, '')
        //    .substring(0, length)
  
        //  while(pickupID.length < length){
        //     pickupID += crypto.randomBytes(1)
        //  .toString("base64")
        //  .replace(/[^a-zA-Z0-9]/g, '');
        //  pickupID = pickupID.substring(0, length)
        // }
        //    return pickupID;
        // }
        
        const newStudent = new students({
            fullName, 
            address, 
            dob, 
            gender,
            classIn, 
            guardianPhone, 
            guardianEmail,
            studentId: generateID(),
            pickUp_Id: generateStudentPickupID()
        })
        // const token = jwt.sign({
        //     studentId:newStudent.studentId,
        //     guardianEmail
        // })
        
        await newStudent.save();
        teacher.studentData.push(newStudent._id)
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
        const checkStudent = await schoolModel.findById(studentId)
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