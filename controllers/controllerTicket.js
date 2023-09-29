const db = require('../config/db');
const path = require('path');

module.exports = {
    async getCreate(req, res) {

       // res.render('ticket/ticketCreate',{layout: 'main.handlebars' });
       var categorias = await db.Categoria.findAll()
       res.render('ticket/ticketCreate', {
           categorias: categorias.map(categoria => categoria.toJSON())
       });
    },
   /* async postCreate(req, res) {
        db.Ticket.create({
            titulo:req.body.titulo,
            descricao:req.body.descricao,
            status: 'P',
            autorId: 1,
            categoriaId:req.body.categoria
            }).then(() => {
                res.redirect('/home');
            }).catch((err) => {
                console.log(err);
            });
    },*/
    async postCreate(req, res) {
        console.log(req.body)
        db.Ticket.create(req.body)
            .then(() => {
                res.redirect('/home')
            })
            .catch((err) => {
                console.log(err);
            });
    },
    async getList(req, res) {
        try {
            let where;

            if (res.locals.tecnico) {
                where = { tecnicoId: req.session.userId };
            } else if (!res.locals.adm) {
                where = { autorId: req.session.userId };
            }

            const tickets = await db.Ticket.findAll({
                where: where,
                include: [
                    {
                        model: db.Categoria,
                        as: 'Categoria',
                        attributes: ['descricao'],
                    },
                    {
                        model: db.Usuario, 
                        as: 'Tecnico',
                        attributes: ['login'],
                    },
                ],
                order: [['id', 'ASC']],
            });
            const ticketList = tickets.map(ticket => ({
                id:ticket.id,
                titulo: ticket.titulo,
                descricao: ticket.descricao,
                status: ticket.status,
                categoria: ticket.Categoria ? ticket.Categoria.descricao : 'N/A',
                tecnicoId: ticket.Tecnico ? ticket.Tecnico.login : 'N/A',
                observacao: ticket.observacao
            }));
    
            res.render('ticket/ticketList', { tickets: ticketList });
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar tickets');
        }
    },
    async getUpdate(req, res) {
        var tecnicos = await db.Usuario.findAll({
            where:{
                tipo: 'T'
            }
        })
        var categorias = await db.Categoria.findAll()
        await db.Ticket.findByPk(req.params.id).then(
            ticket => res.render('ticket/ticketUpdate',
                {
                    ticket: ticket.dataValues,
                    categorias: categorias.map(categoria => categoria.toJSON()),
                    tecnicos: tecnicos.map(tecnico => tecnico.toJSON())
                })
        ).catch(function (err) {
            console.log(err);
        });
    },
    /*async getUpdate(req, res) {

        await db.Ticket.findByPk(req.params.id).then(
            ticket => {
                res.render('ticket/ticketUpdate', { ticket: ticket.dataValues });
            }
        ).catch(function (err) {
            console.log(err);
        });
    },*/
    async postUpdate(req, res) {
        console.log(req.body);
    
        try {
            //Se o técnico está mudando 
            if(req.body.status == 'R'){
                req.body.tecnicoId = req.session.userId;
            }
            if (req.body.tecnicoId === "") {
                req.body.tecnicoId = null;
            }
            await db.Ticket.update(req.body, { where: { id: req.body.id } });
            res.redirect('/ticketList');
        } catch (err) {
            console.error(err);
        }
    },
}