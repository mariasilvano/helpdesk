main.style.display = 'none';

const botaoAtivo = document.getElementById("tickets");
botaoAtivo.classList.add('ativo')

var tickets = document.querySelectorAll(".status");


tickets.forEach(function (ticket) {

    var status = ticket.getAttribute("data-status");

    ticket.classList.add("status", status);
});