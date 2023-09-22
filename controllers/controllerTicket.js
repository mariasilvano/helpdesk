const db = require('../config/db');
const path = require('path');

module.exports = {
    async getCreate(req, res) {

        res.render('ticket/ticketCreate',{layout: 'main.handlebars' });
    },
    async postCreate(req, res) {
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
    },
    async getList(req, res) {
        try {
            const tickets = await db.Ticket.findAll({
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
                categoria: ticket.Categoria.descricao, 
                tecnicoId: ticket.Tecnico ? ticket.Tecnico.login : 'N/A',
                observacao: ticket.observacao
            }));
    
            res.render('ticket/ticketList', { tickets: ticketList });
        } catch (err) {
            console.log(err);
            // Trate o erro de acordo com suas necessidades
            res.status(500).send('Erro ao buscar tickets');
        }
    },
    async getUpdate(req, res) {

        await db.Ticket.findByPk(req.params.id).then(
            ticket => {
                res.render('ticket/ticketUpdate', { ticket: ticket.dataValues });
            }
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        console.log(req.body)
        await db.Ticket.update(req.body, { where: { id: req.body.id } }).then(
            res.render('home')
        ).catch(function (err) {
            console.log(err);
        });
    },
}