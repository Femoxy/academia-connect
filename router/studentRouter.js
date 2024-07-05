const express = require('express')
const {studentProfile} = require('../controllers/studentController')


router.get('/studentProfile', studentProfile)

module.exports = router