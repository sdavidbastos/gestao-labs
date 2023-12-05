const { ExpressAdapter } = require('../adapters/express.js');
const { createBookingUseCase, authUseCase } = require('../domain/index.js');

const bookingRoutes = require('express').Router();

bookingRoutes.use(ExpressAdapter.execute(authUseCase))
bookingRoutes.post('/booking', ExpressAdapter.execute(createBookingUseCase));

module.exports = { bookingRoutes }