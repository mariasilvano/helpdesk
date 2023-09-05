const db = require('./config/db');
const path = require('path');
const express = require('express');
const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
  )
/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/novaConta', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'novaConta.html'));
});
app.post("/cadastrarUsuario", function(req,res){
    console.log('AQUI está cadastrando');

    db.Usuario.create({
        nome:req.body.nome,
        senha:req.body.senha,
    })
    res.redirect('/login');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post("/cadastrarTicket", function(req,res){
    db.Ticket.create({
        titulo:req.body.titulo,
        descricao:req.body.descricao,
        categoria:req.body.categoria
    })
    res.redirect('/tickets');
});

app.post("/cadastrarCategoria", function(req,res){
    db.Categoria.create({
        nome:req.body.nome,
        descricao:req.body.descricao
    })
});

app.get("/categorias",function(req,res){
    (async () => {
            const categorias = await db.Categoria.findAll();
            res.json(categorias);
    })();
});

app.listen(8081, function(){
        console.log("Servidor no http://localhost:8081/login")
});