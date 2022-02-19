const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('resposta', {

    corpo: {

        type: Sequelize.STRING,
        allowNull: false

    },

    perguntaId: {

        type: Sequelize.INTEGER,
        allowNull: false

    }

})

Resposta.sync({force: false}).then(()=>{

    console.log('tabela de respostas foi criada')

})

module.exports = Resposta;