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
            token.create(user.id),
            client.user.create({ data: { ...userBuild } }),
            client.classroom.create({ data: { ...classroomBuild } })
        ])

        console.log("user =>", user)

        await client.booking.create({
            data: {
                ...bookingBuild,
                teacher: user,
                classroom
            }
        })

    })

    test('should return booking', async () => {
        const response = await request(app)
            .post('/api/booking')
            .set('Authorization', authorization)
            .send({ data:{ booking, classroom }});

        expect(response.body).toEqual(expect.objectContaining(booking))
        expect(response.statusCode).toBe(200)

    });
})
