const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const { postLogin, getImprint } = require('./login')

// console.log(postLogin, getImprint, require('./login'), 'ssss')
router.post('/login', catchErrors(postLogin))

module.exports = router
