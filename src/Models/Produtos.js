const { DataTypes } = require("sequelize")
const sequelize = require('./Db')

const Produto = sequelize.define("Produtos", {
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
    preco:{
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    img:{
        type: DataTypes.STRING
    }

})

Produto.sync()

module.exports = Produto