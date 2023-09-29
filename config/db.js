const Sequelize = require ('sequelize');
const sequelize = new Sequelize ('helpdesk','postgres','1234',
    {host: 'localhost', dialect: 'postgres'});

    var db = {};
    db.Sequelize = Sequelize;//Módulo Sequelize
    db.sequelize = sequelize;//Instância da conexão ao banco
    db.Usuario = require('../models/usuario')(sequelize, Sequelize);
    db.Categoria = require('../models/categoria.js')(sequelize, Sequelize);
    db.Ticket = require('../models/ticket.js')(sequelize, Sequelize);

    db.Usuario.hasMany(db.Ticket, {foreignKey: 'autorId'});
    db.Usuario.hasMany(db.Ticket, {foreignKey: 'tecnicoId'});
    db.Categoria.hasMany(db.Ticket, {foreignKey: 'categoriaId'});
    db.Ticket.belongsTo(db.Categoria, { foreignKey: 'categoriaId', as: 'Categoria'  });
    db.Ticket.belongsTo(db.Usuario, { foreignKey: 'tecnicoId', as: 'Tecnico'  });
    module.exports = db;