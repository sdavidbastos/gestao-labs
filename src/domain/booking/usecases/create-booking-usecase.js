const { UnauthorizedError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateBookingUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { data } = httpRequest.body;

           const booking = await this.client.booking.create({
            data: {
                ...data,
                teacher: {
                    connect: { id: user.id }
                }
            }
        });
            return HttpResponse.ok({ ...booking });
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateBookingUseCase }