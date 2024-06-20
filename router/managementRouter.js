const express = require('express')
const {signUp, logIn, createStudent, getOneStudent, studentByClass} = require('../controllers/managementController')


const router = express.Router();

router.post("/signup", signUp);
router.post('/login', logIn);
router.post('registerStudent', createStudent);
router.get('/student', getOneStudent);
router.post('/allstudentbyclass', studentByClass)

module.exports = router