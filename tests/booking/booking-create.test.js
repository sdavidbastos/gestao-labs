const request = require('supertest')

const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client")
const { HelperFactory } = require('../../src/utils/helpers')
const { UserBuilder, BookingBuilder, ClassroomBuilder } = require('../builders')

describe('Booking Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    const userBuild = new UserBuilder().setRole('TEACHER').build()
    const classroomBuild = new ClassroomBuilder().build()
    const bookingBuild = new BookingBuilder().build()
    let authorization

    beforeAll(async () => {
        [authorization, user, classroom] = await Promise.all([
            token.create(userBuild.id),
            client.user.create({ data: { ...userBuild } }),
            client.classroom.create({ data: { ...classroomBuild } })
        ])
        client.classroom.findMany()
    })

    test('should create new booking', async () => {
        const response = await request(app)
            .post('/api/booking')
            .set('Authorization', authorization)
            .send({ data: { booking: {...bookingBuild}, classroomId: classroomBuild.id } });
            const bookingObject = {
                "bookingDateEnd": bookingBuild.bookingDateEnd.toISOString(),
                "bookingDateStart":  bookingBuild.bookingDateStart.toISOString(),
                "classroomId": classroomBuild.id,
                "description": bookingBuild.description,
                "id": bookingBuild.id,
                "status": "CONFIRMED",
                "teacherId": userBuild.id,
               }
        expect(response.body).toEqual(expect.objectContaining(bookingObject))
        expect(response.statusCode).toBe(200)
    });
})
