const form = document.getElementById("form");
const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const confirmeSenha = document.getElementById("confirme-senha");

form.addEventListener("submit", (e) => {
    if (!checkInputs()){
        e.preventDefault();
    }
    console.log("está criando conta")
});

function checkInputs() {
    const nomeValue = nome.value;
    const senhaValue = senha.value;
    const confirmeValue = confirmeSenha.value;

    if (nomeValue == "") {
        setErrorFor(nome, "O nome de usuário é obrigatório.");
    } else {
        setSucessFor(nome);
    }
    if (senhaValue == "") {
        setErrorFor(senha, "A senha é obrigatória");
    } else {
        setSucessFor(senha);
    }
    if (senhaValue !== confirmeValue){
        setErrorFor(confirmeSenha, "senhas diferentes");
    } else {
        setSucessFor(confirmeSenha);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control sucess";
    });

    if (formIsValid) {
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
