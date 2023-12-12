const { ExpressAdapter } = require('../adapters/express.js');
const { createClassroomUseCase, authUseCase } = require('../domain/index.js');

const classroomRoutes = require('express').Router();
classroomRoutes.use(ExpressAdapter.execute(authUseCase))
classroomRoutes.post('/classroom', ExpressAdapter.execute(createClassroomUseCase));
classroomRoutes.get('/classroom/:id?', ExpressAdapter.execute(createClassroomUseCase));

module.exports = { classroomRoutes }