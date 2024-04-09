const express = require('express')
const routes = express.Router()

routes.use('/typeExercise', require('./typesexercise'));

routes.use('/category', require('./category'));

routes.use('/exercise', require('./exercise'));

routes.use('/users', require('./users'));

routes.use('/routine', require('./routine'));

routes.use('/sessions', require('./sessions'));

routes.use('/sessions_exercise', require('./sessions_exercise'));

routes.use('/calendar', require('./calendar'));

module.exports = routes;