const { userRoutes, classroomRoutes } = require("../routes")
const api = "/api"

module.exports = app => {
    app.use(api, userRoutes),
    app.use(api, classroomRoutes)
}