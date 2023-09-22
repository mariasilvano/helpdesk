const db = require('../config/db');
const path = require('path');
const categoria = require('../models/categoria');

module.exports = {
    async getCreate(req, res) {
        res.render('categoria/categoriaCreate',{layout: 'main.handlebars' });
    },
    async postCreate(req, res) {
        db.Categoria.create({
            nome:req.body.nome,
            descricao:req.body.descricao,
            }).then(() => {
                res.redirect('/home');
            }).catch((err) => {
                console.log(err);
            });
    },
    async getList(req, res){
        try {
            // Consulte o banco de dados usando Sequelize para buscar as opções desejadas
            const categorias = await db.Categoria.findAll(); // Suponha que você tenha um modelo 'Categoria' definido
        
            // Mapeie as categorias para o formato adequado
            const opcoesSelect = categorias.map(categoria => ({
              value: categoria.id,
              text: categoria.nome,
            }));
        
            // Envie as opções como resposta JSON
            res.json(opcoesSelect);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar as categorias.' });
          }
}};