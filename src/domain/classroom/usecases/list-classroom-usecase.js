const { HttpResponse } = require("../../../utils/helpers/http-response");

class ListClassroomUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { id } = httpRequest.params
            let classroom
            if (id) {
                classroom = await this.client.classroom.findUnique({
                    where: {
                        id
                    }
                });

                return HttpResponse.ok(classroom);
            }
            classroom = await client.classroom.findMany();

            return HttpResponse.ok(classroom);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { ListClassroomUseCase }