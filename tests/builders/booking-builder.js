const { faker } = require("@faker-js/faker/locale/pt_BR")
class BookingBuilder {
    constructor() {
        this.booking = {
            id: faker.string.uuid(),
            BookingDateStart: faker.date.soon({ days: 5 }),
            BookingDateEnd: faker.date.soon({ days: 5 }),
        };
    }

    build() {
        return this.booking;
    }
}


module.exports = { BookingBuilder }