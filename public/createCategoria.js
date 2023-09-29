main.style.display = 'none';
/**/
    const botaoAtivo = document.getElementById("cadCategoria");
    botaoAtivo.classList.add('ativo')
/**/
const form = document.getElementById("formCat");
const titulo = document.getElementById("nomeCat");
const descricao = document.getElementById("descricaoCat");

form.addEventListener("submit", (e) => {
    if (!checkInputs()) {
        console.log("Está dizendo que algum campo está inválido")
        e.preventDefault();
    }
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

    var formControls = form.querySelectorAll(".form-control");

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