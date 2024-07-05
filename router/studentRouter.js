const express = require('express')
const {studentProfile} = require('../controllers/studentController')
const router = require('./managementRouter')

router.get('/studentProfile', studentProfile)

module.exports = router