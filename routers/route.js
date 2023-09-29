const express = require('express');
const db = require('../config/db');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerCategoria = require('../controllers/controllerCategoria');
const controllerTicket = require('../controllers/controllerTicket');
const route = express.Router();

/*CRIAÇÃO DO BANCO DE DADOS BD 
db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
    db.Usuario.create({login: 'adm', senha:'123', tipo:'A'});
});*/

module.exports = route;

//Home
route.get("/home", function (req, res) { 
    if (req.session.login){
       // res.render('home') 
        res.render('home');
    } else {
        res.redirect('/');
    }
});

//Controller Usuario
//Usuario -  Login 
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);
//Usuario create
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/tecnicos", controllerUsuario.getTecnicos);
route.post("/usuarioUpdate", controllerUsuario.postUpdate);

//Ticket create
route.get("/ticketCreate", controllerTicket.getCreate);
route.post("/ticketCreate", controllerTicket.postCreate);
route.get("/ticketList", controllerTicket.getList);
route.get("/ticketUpdate/:id", controllerTicket.getUpdate);
route.post("/ticketUpdate", controllerTicket.postUpdate);

//Categoria create
route.get("/categoriaCreate", controllerCategoria.getCreate);
route.post("/categoriaCreate", controllerCategoria.postCreate);
route.get("/categorias", controllerCategoria.getList);