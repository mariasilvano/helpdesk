function toogleMenu(){
  const menuMobile = document.getElementById("menu-mobile")

  if(menuMobile.className === "menu-mobile-active"){
    menuMobile.className = "menu-mobile"
  }else{
    menuMobile.className = "menu-mobile-active"
  }
}
//Função que carrega as informações da página inicial
function home(){
  var main = document.getElementById('home');
  var novoTicket = document.getElementById('ticket');
  var tickets = document.getElementById('tickets');
  main.style.display = "block";
  novoTicket.style.display="none";
  tickets.style.display = "none";
}
//Função que mostra o formulário para criar novos tickets
function novoTicket(){
  var main = document.getElementById('home');
  var novoTicket = document.getElementById('ticket');
  var tickets = document.getElementById('tickets');
  main.style.display = "none";
  novoTicket.style.display="block";
  tickets.style.display = "none";
}

const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const titulovalue = titulo.value;
  const descricaovalue = descricao.value;

  if (titulovalue == "") {
    setErrorFor(titulo, "O título é obrigatório.");
  } else {
    setSucessFor(titulo);
  }
  if (descricaovalue == "") {
    setErrorFor(descricao, "A descrição é obrigatória.");
  } else {
    setSucessFor(descricao);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control sucess";
  });

  if (formIsValid) {
    alert("válido");
    document.getElementById("");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSucessFor(input) {
  const formControl = input.parentElement;

  //Adicionar classe de sucesso
  formControl.className = "form-control sucess";
}

function setErrorFor(textarea, message) {
  const formControl = textarea.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSucessFor(textarea) {
  const formControl = textarea.parentElement;

  //Adicionar classe de sucesso
  formControl.className = "form-control sucess";
}

//Função que carrega os tickets do usuário
function carregarTickets(){
  var main = document.getElementById('home');
  var novoTicket = document.getElementById('ticket');
  var tickets = document.getElementById('tickets');
  main.style.display = "none";
  novoTicket.style.display="none";
  tickets.style.display = "block";
}