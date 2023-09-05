var menuItem = document.querySelectorAll('.item-menu')

function selecionaMenu(){
  menuItem.forEach((item)=>
    item.classList.remove('ativo')
  )
  this.classList.add('ativo')
}

menuItem.forEach((item)=>
  item.addEventListener('click', selecionaMenu)
)

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
  var categoria = document.getElementById('cadCategoria');

  categoria.style.display="none";
  main.style.display = "block";
  novoTicket.style.display="none";
  tickets.style.display = "none";
}
//Função que mostra o formulário para criar novos tickets
function novoTicket(){
  var main = document.getElementById('home');
  var novoTicket = document.getElementById('ticket');
  var tickets = document.getElementById('tickets');
  var categoria = document.getElementById('cadCategoria');

  categoria.style.display = "none";
  main.style.display = "none";
  novoTicket.style.display="block";
  tickets.style.display = "none";
}

function cadastrarCategoria(){
  var main = document.getElementById('home');
  var novoTicket = document.getElementById('ticket');
  var tickets = document.getElementById('tickets');
  var categoria = document.getElementById('cadCategoria');
  
  categoria.style.display="block";
  main.style.display = "none";
  novoTicket.style.display="none";
  tickets.style.display = "none"
}

const form = document.getElementById("form");
const formCat = document.getElementById("formCat")
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const descricaoCat = document.getElementById("descricaoCat");

form.addEventListener("submit", (e) => {
  if (!checkInputs()){
      e.preventDefault();
  }
});

formCat.addEventListener("submit", (e) => {
  if (!checkInputs()){
      e.preventDefault();
  }
});

function checkInputs() {
  const titulovalue = titulo.value;
  const descricaovalue = descricao.value;
  const nomevalue = nome.value;
  const descricaoCatvalue = descricaoCat.value;

  const botao = event.submitter;
  if (botao.id =="ticket"){
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
  }else if(botao.id=="categoria"){
    if (nomevalue == "" ) {
      setErrorFor(nome, "O nome é obrigatório.");
    } else {
      setSucessFor(nome);
    }
    if (descricaoCatvalue == "") {
      setErrorFor(descricaoCat, "A descrição é obrigatória.");
    } else {
      setSucessFor(descricaoCat);
    }
  }

  if (botao.id =="ticket"){
    var formControls = form.querySelectorAll(".form-control");
  }else if(botao.id=="categoria"){
    var formControls = formCat.querySelectorAll(".form-control");
  }
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control sucess";
  });

  if (formIsValid) { 
    alert("Categoria cadastrada com suesso")
    return true;
}else{  
    return false;
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
  var categoria = document.getElementById('cadCategoria');
  
  categoria.style.display="none";
  main.style.display = "none";
  novoTicket.style.display="none";
  tickets.style.display = "block";
}

function buscarCategorias(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/categorias', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
        const categorias = JSON.parse(xhr.responseText);

        // Faça algo com os dados das categorias, como preencher uma tag select
        preencherSelect(categorias);
    } else {
        console.error('Erro ao buscar as categorias.');
    }
};

xhr.send();

}
function preencherSelect(categorias) {
  const select = document.getElementById('categoria');

  select.innerHTML = "<option value=''>Selecione uma categoria</option>";

  categorias.forEach(function (categoria) {
      const option = document.createElement('option');
      option.value = categoria.id;
      option.textContent = categoria.nome;
      select.appendChild(option);
  });
}
window.addEventListener("load", (event) => {
  buscarCategorias();
});