const request = require('supertest')

const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client")
const { HelperFactory } = require('../../src/utils/helpers')
const { UserBuilder, ClassroomBuilder } = require('../builders')

describe('Classroom Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    const user = new UserBuilder().setRole('ADMIN').build()
    const classroom = new ClassroomBuilder().build()
    let authorization

    beforeAll(async () => {
        [authorization] = await Promise.all([
            token.create(user.id),
            client.user.create({ data: { ...user } }),
        ])
    })

    test('should return classroom', async () => {
        const response = await request(app)
            .post('/api/classroom')
            .set('Authorization', authorization)
            .send({ data: classroom });

        expect(response.body).toEqual(expect.objectContaining(classroom))
        expect(response.statusCode).toBe(200)

    });
})
