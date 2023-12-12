const { UnauthorizedError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateBookingUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { data, user } = httpRequest.body;
            const { booking, classroomId } = data
            const bookingObject = await this.client.booking.create({
                data: {
                    ...booking,
                    classroom: { connect: { id: classroomId } },
                    teacher: { connect: { id: user.id } },
                }
            });
            return HttpResponse.ok({ ...bookingObject });
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateBookingUseCase }