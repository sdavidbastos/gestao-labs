const { faker } = require("@faker-js/faker/locale/pt_BR")
class ClassroomBuilder {
    constructor() {
        this.classroom = {
            id: faker.string.uuid(),
            name: faker.location.city(),
            description: faker.string.alpha({length:{max: 20}})
        };
    }

    build() {
        return this.classroom;
    }
}


module.exports = { ClassroomBuilder }