const mongoose =require('mongoose');
//School management
const schoolSchema = new mongoose.Schema({
    fullName:{
        type: String,
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    announcement:{
      type:Array
    },
    isAdmin:{
      type:Boolean,
      default: false
  },
    // role:{
    //     type:String,
    //     enum:['Owner', 'Principal', 'VP']
    // },
    },{timestamps: true})
    const schoolModel = mongoose.model('Management', schoolSchema)



    const teacherSchema = new mongoose.Schema({

    teacherName:{
        type:String
    },
    email:{
        type: String
    },
    password:{
      type: String
    },
    phoneNumber:{
        type:String
    },
    address:{
      type:String
    },
    role:{
      type: String,
      enum: ['Class Teacher', 'Subject Teacher']
    },
    
    studentData:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "studentData"
    }

},{timestamps: true})
const teachers = mongoose.model('Teachers', schoolSchema)

//Pupil / Student schema
const studentSchema = new mongoose.Schema({
  fullName:{
    type: String
  },
  address:{
    type:String
  },
  dob:{
    type: String
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
  noteAboutStudent:{
    type:String
  },
  image:{
    url:{
        type:String
    },
    public_id:{
        type:String
    }
  },
  studentId:{
    type:String
  },
  pickUp_Id:{
    type:String
  },
  studentPickUpID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PickupIDs'
  }
},{timestamps:true})
const students = mongoose.model('studentData', studentSchema)

//Student Pickup ID
const idSchema = new mongoose.Schema({
  pickupID: {
    type: String,
    required: true
  },
  generatedAt: {
    type: Date,
    required: true
  },
});

const pickupModel = mongoose.model('PickupIDs', idSchema);


module.exports = {schoolModel, teachers, students, pickupModel}