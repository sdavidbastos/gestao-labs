const { UnauthorizedError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateClassroomUseCase {
    constructor({ client }) {
        this.client = client
    }

    async execute(httpRequest) {
        try {
            const { data, user } = httpRequest.body;
            if (user.role !== "ADMIN") {
                return HttpResponse.badRequest(new UnauthorizedError());
            }
           const classroom = await this.client.classroom.create({
                data
            });
            return HttpResponse.ok({ ...classroom });
        } catch (error) {
            return HttpResponse.serverError();
        }
    }
}

module.exports = { CreateClassroomUseCase }