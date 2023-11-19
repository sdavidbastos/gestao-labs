const { ExpressAdapter } = require('../adapters/express.js');
const { createUserUseCase, loginUserUseCase } = require('../domain/index.js');

const userRoutes = require('express').Router();

userRoutes.post('/user', ExpressAdapter.execute(createUserUseCase));

userRoutes.post('/login', ExpressAdapter.execute(loginUserUseCase));

userRoutes.get('/hello', (request, response)=>{
    return response.status(200).json({"message": "Hello World"})
})

module.exports = { userRoutes }