const sequelize = require('./Db')
const { DataTypes } = require("sequelize")


const Contato = sequelize.define("Contatos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    instagram:{
        type: DataTypes.STRING,
        
    },
    facebook:{
        type: DataTypes.STRING,
        
    },
    email:{
        type: DataTypes.STRING,
        
    },
    telefone:{
        type: DataTypes.STRING,
        
    },
    whatsapp:{
        type: DataTypes.STRING,
        
    },
    endereco:{
        type: DataTypes.STRING,
        
    }

})



const contInicial = async () => {
    await Contato.sync()
}

contInicial()

module.exports = Contato