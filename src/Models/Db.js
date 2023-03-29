const { Sequelize } = require("sequelize")
const path = require('path')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../db.sqlite3")
})

module.exports = sequelize