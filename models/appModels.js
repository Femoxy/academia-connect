const mongoose =require('mongoose');
//School management
const schoolSchema = new mongoose.Schema({
    // schoolName:{
    //     type: String,
    // },
    // password:{
    //     type:String
    // },
    // email:{
    //     type:String
    // },
    // address:{
    //     type:String
    // },
    // announcement:{
    //   type:String
    // },
    // role:{
    //     type:String,
    //     enum:['Management', 'Teacher']
    // },
    
    teacherName:{
        type:String
    },
    email:{
        type: String
    },
    phone:{
        type:String
    },
    address:{
      type:String
    },
    isAdmin:{
      type:Boolean,
      default: false
  },
    studentData:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "studentData"
    }

},{timestamps: true})
const schools = mongoose.model('schools', schoolSchema)

//Pupil / Student schema
const studentSchema = new mongoose.Schema({
  fullName:{
    type: String
  },
  address:{
    type:String
  },
  dob:{
    type:String
  },
  classIn:{
    type:String
  },
  gender:{
    type:String
  },
  guardianPhone:{
    type:String,
    unique: true
  },
  guardianEmail:{
    type:String,
    unique:true
  },
  comment:{
    type:String
  },
  image:{
    url:{
        type:String
    },
    public_id:{
        type:String
    }
  }

},{timestamps:true})
const students = mongoose.model('studentData', studentSchema)

module.exports = {schools, students}