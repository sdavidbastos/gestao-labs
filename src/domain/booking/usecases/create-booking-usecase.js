const { UnauthorizedError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateBookingUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
           const { data, user } = httpRequest.body;
           const {bookingInput, classroom} = data
           const booking = await this.client.booking.create({
            data: {
                ...bookingInput,
                teacher: {connect: { id: user.id }},
                classroom: {connect: {id: classroom.id}}
            }
        });
            return HttpResponse.ok({ ...booking });
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateBookingUseCase }