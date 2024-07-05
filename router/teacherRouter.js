const express = require('express')
const {teacherProfile} = require('../controllers/teacherController')

router.get('/teacherProfile',teacherProfile)
