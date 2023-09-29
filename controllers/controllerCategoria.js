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
/*async getList(req, res){
        try {
            const categorias = await db.Categoria.findAll(); 
            const opcoesSelect = categorias.map(categoria => ({
                value: categoria.id,
                text: categoria.nome,
            }));
            res.json(opcoesSelect);
            } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar as categorias.' });
            }
},*/
async getList(req, res) {
    db.Categoria.findAll().then(categorias => {
        res.render('categoria/categoriaList', { 
            categorias: categorias.map(catg => catg.toJSON())});
    }).catch((err) => {
        console.log(err);
    });
}};