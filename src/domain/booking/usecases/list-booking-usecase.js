const { HttpResponse } = require("../../../utils/helpers/http-response");

class ListBookingUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { start, end } = httpRequest.query
            let booking
            if (start && end) {
                booking = await this.client.booking.findUnique({
                    where: {
                        date: {
                            gte: new Date(start),
                            lte: new Date(end),
                        }
                    }
                });
                return HttpResponse.ok(booking);
            }
            booking = await client.booking.findMany();

            return HttpResponse.ok(booking);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { ListBookingUseCase }