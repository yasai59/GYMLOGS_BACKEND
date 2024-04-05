const express = require('express')
const routes = express.Router()

routes.use('/typeExercise', require('./typesexercise'));

routes.use('/category', require('./category'));

routes.use('/exercise', require('./exercise'));

routes.use('/users', require('./users'));

module.exports = routes;