// const signUp = async(req, res)=>{
//     try {
//         const {fullName, password, email, phone, address} = req.body
//         const teacher =  await teacherModel.findOne({email: email})
//         if(teacher){
//             return res.status(200).json({
//                 message: "School already registered"
//             })
//         }
//         const salt =  bcrypt.genSaltSync(12);
//         const hashPassword = bcrypt.hashSync(password, salt);
        
//         const management = new schoolModel({
//             fullName, 
//             password: hashPassword, 
//             email, 
//             phone,
//             address
//         })
       
//         await management.save();
//         return res.status(200).json({
//             message:"SignUp successfull",
//             data:management
//         })
        
//     } catch (error) {
//         return res.send('An error occur '+error.message)
//     }
// }

// const logIn = async(req, res)=>{
//     try {
//         const {email, password} = req.body;
//         const checkTeacher = await schoolModel.findOne({email})
//         if(!checkTeacher){
//             return res.status(401).json({
//               message:'User not found',
//             });
//           }
//         const checkPassword = bcrypt.compareSync(password, checkTeacher.password)
//         if(!checkPassword){
//             return res.status(200).json({
//                 message: "Incorrect password or email"
//             })
//         }  
//         const token = jwt.sign({
//             teacherId:checkTeacher._id,
//             email:checkTeacher.email,
//            // role: checkTeacher.role.enum['teacher']
//         }, process.env.secret, {expiresIn:'30mins'})

//         await checkTeacher.save();
//         return res.status(200).json({
//             message:"Login successfully",
//             token 
//         })
          
//     } catch (error) {
//         return res.status(500).send("somthing went wrong")
//     }
    
// }