const db = require('../config/db');
const path = require('path');

module.exports = {
    async getLogout(req,res){
        req.session.destroy();
        res.redirect('/')
    },
    async getLogin(req, res) {
        res.render('usuario/login',{layout: 'noMenu.handlebars'});
    },
    async postLogin(req, res) {
        console.log(req.body)
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }
            ).then(usuarios => {
                if (usuarios.length > 0) {
                    req.session.login = req.body.login
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    if (usuarios[0].dataValues.tipo == 'A') {
                        res.locals.adm = true;
                    } else if(usuarios[0].dataValues.tipo == 'T'){
                        res.locals.tecnico = true;
                        res.locals.adm = false;
                    } else if(usuarios[0].dataValues.tipo == 'U'){
                        res.locals.tecnico = false;
                        res.locals.adm = false;
                    }
                    req.session.userId = usuarios[0].dataValues.id;
                    res.render('home');
                } else {
                    res.redirect('/');
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate',{layout: 'noMenu.handlebars'});
    },
    async postCreate(req, res) {
        db.Usuario.create({
            login:req.body.login,
            senha:req.body.senha,
            tipo:'U'
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                console.log(err);
            });
    },
    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },
    async getTecnicos(req, res){
        console.log("Está buscando os usuários")
        try {
            const usuarios = await db.Usuario.findAll({
                where:{
                    tipo: 'T'
                }
            });
        
            const opcoesSelect = usuarios.map(usuario => ({
                value: usuario.id,
                text: usuario.login,
            }));

            res.json(opcoesSelect);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar as técnicos.' });
        }
    },
    
    async postUpdate(req, res){
        try {
            const id = req.body.id;
            console.log("Controller");
            console.log(req.body);
            const novoTipo = req.body.novoTipo;

            const usuario = await db.Usuario.findByPk(id);
    
            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
            }
            usuario.tipo = novoTipo;
            await usuario.save();
    
            res.json({ success: true, message: 'Tipo de usuário atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar o tipo de usuário:', error);
            res.status(500).json({ success: false, message: 'Erro ao atualizar o tipo de usuário.' });
        }

    },
};