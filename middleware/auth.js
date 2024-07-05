const {schools, students} = require('../models/appModels');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateManagement = async(req, res, next)=>{
    try {
        const hasAuthorized = req.headers.authorization
        if(!hasAuthorized){
            return res.status(400).json({
                message: 'Invalid authorization'
            })
        }
        const token = hasAuthorized.split(' ')[1]
        if(!token){
            return res.status(404).json({
                message:'Token not found'
            })
        }
        const decodeToken = jwt.verify(token, process.env.secret)
        const management = await schools.findById(decodeToken.managementId)
        if(!management){
            return res.status(404).json({
                message:"Not Authorized"
            })
        }
        req.management= decodeToken;
        next();
        
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(501).json({
                error: 'session time out, please login to continue'
            })
        }
        return res.status(500).json({
            error: "Internal server error " + error.message
        })
    }
}

const authenticateTeacher = async(req, res, next)=>{
    try {
        const hasAuthorized = req.headers.authorization
        if(!hasAuthorized){
            return res.status(400).json({
                message: 'Invalid authorization'
            })
        }
        const token = hasAuthorized.split(' ')[1]
        if(!token){
            return res.status(404).json({
                message:'Token not found'
            })
        }
        const decodeToken = jwt.verify(token, process.env.secret)
        const teacher = await schools.findById(decodeToken.teacherId)
        if(!teacher){
            return res.status(404).json({
                message:"Not Authorized"
            })
        }
        req.teacher= decodeToken;
        next();
        
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(501).json({
                error: 'session time out, please login to continue'
            })
        }
        return res.status(500).json({
            error: "Internal server error " + error.message
        })
    }
}

const authenticateStudent = async(req, res, next)=>{
    try {
        const hasAuthorized = req.headers.authorization
        if(!hasAuthorized){
            return res.status(400).json({
                message: 'Invalid authorization'
            })
        }
        const token = hasAuthorized.split(' ')[1]
        if(!token){
            return res.status(404).json({
                message:'Token not found'
            })
        }
        const decodeToken = jwt.verify(token, process.env.secret)
        const student = await students.findById(decodeToken.studentId)
        if(!student){
            return res.status(404).json({
                message:"Not Authorized"
            })
        }
        req.student= decodeToken;
        next();
        
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(501).json({
                error: 'session time out, please login to continue'
            })
        }
        return res.status(500).json({
            error: "Internal server error " + error.message
        })
    }
}

const admin = (req,res,next)=>{
    authenticateTeacher(req, res, async()=>{
        if(req.management.isAdim){
            next()
        } else{
            return res.status(401).json({
                message:"Not authorized: user not an Admin"
            })
        }
    })
}

module.exports = {authenticateManagement, authenticateTeacher, authenticateStudent, admin} 