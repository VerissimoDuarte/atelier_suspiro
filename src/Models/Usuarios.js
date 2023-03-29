const { DataTypes } = require("sequelize")
const sequelize = require('./Db')

const Usuario = sequelize.define("Usuarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

Usuario.sync()

module.exports = Usuario