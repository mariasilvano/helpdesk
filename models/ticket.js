const Categoria = require('./categoria');
module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define('tickets',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        titulo:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status:{
            //(P(pendente) A(Em análise) R(Resolvido) C(cancelado)
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: 'P'
        },
        autorId:{
            //Usuário que criou o Ticket
            type: Sequelize.INTEGER,
            allowNull: false
        },
        categoriaId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tecnicoId:{
            //Técnico responsável pelo Ticket
            type: Sequelize.INTEGER,
            allowNull: true
        },
        observacao:{
            //O técnico pode adicionar uma observação quando concluir o Ticket
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return Ticket;
}