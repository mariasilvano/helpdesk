module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuarios',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING(100), 
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        tipo: {
            //A - Administrador T - técnico U - usuário'; 
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: 'U'
        }
    });
    return Usuario
}