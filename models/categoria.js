module.exports = (sequelize, Sequelize) => {

    const Categoria = sequelize.define('categorias',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type:Sequelize.STRING(50),
            allowNull: false
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });
    return Categoria;
}
