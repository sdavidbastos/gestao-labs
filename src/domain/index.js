const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const client = require("../database/prisma-client")
const { secret } = require("../config/env.js")
const { Token } = require('../utils/helpers/token')
const { Encrypter } = require('../utils/helpers/encrypter')
const { AuthUseCase } = require('./auth/usecases/auth-usecase')
const { CreateUserUseCase, LoginUserUseCase } = require('./user/usecases')

const token = new Token({ secret, token: jwt })
const encrypt = new Encrypter({ cryptor: bcrypt })

const authUseCase = new AuthUseCase({ client, token })
const createUserUseCase = new CreateUserUseCase({ client, encrypt, token })
const loginUserUseCase = new LoginUserUseCase({ client, encrypt, token })

module.exports = {
    authUseCase,
    createUserUseCase,
    loginUserUseCase,
}