const { faker } = require("@faker-js/faker/locale/pt_BR")
class BookingBuilder {
    constructor() {
        this.booking = {
            id: faker.string.uuid(),
            bookingDateStart: faker.date.soon({ days: 5 }),
            bookingDateEnd: faker.date.soon({ days: 5 }),
            description: faker.string.alpha({length:10})
        };
    }

    build() {
        return this.booking;
    }
}


module.exports = { BookingBuilder }