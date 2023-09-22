main.style.display = 'none';

$.ajax({
    url: '/categorias',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        const select = document.getElementById('selCategoria'); // Substitua 'seuSelectId' pelo ID do seu elemento select
        select.innerHTML = "<option value=''>Selecione uma categoria</option>";

        // Preencher o select com as opções retornadas
        data.forEach(function (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
    },
    error: function (error) {
        console.error('Erro ao buscar as categorias:', error);
    },
});

const form = document.getElementById("form");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const selCategoria = document.getElementById("selCategoria");

form.addEventListener("submit", (e) => {
  if (!checkInputs()){
      e.preventDefault();
  }
});
function checkInputs() {
  const titulovalue = titulo.value;
  const descricaovalue = descricao.value;
  const selCategoriavalue = selCategoria.value;

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
    if (selCategoriavalue == "") {
        setErrorFor(selCategoria, "A categoria é obrigatória.");
      } else {
        setSucessFor(selCategoria);
      }
      var formControls = form.querySelectorAll(".form-control");

      const formIsValid = [...formControls].every((formControl) => {
          return formControl.className === "form-control sucess";
      });
      
      if (formIsValid) { 
          alert("Ticket cadastrado com suesso")
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
