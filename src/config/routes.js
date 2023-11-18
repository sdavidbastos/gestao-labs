const { userRoutes } = require("../routes")
const api = "/api"

module.exports = app => {
    app.use(api, userRoutes)
}