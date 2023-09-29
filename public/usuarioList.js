main.style.display = 'none';
let idDaLinhaAtualmenteEditada = null;

const botaoAtivo = document.getElementById("cadTecnico");
botaoAtivo.classList.add('ativo')

function habilitarEdicao(id) {
    if (idDaLinhaAtualmenteEditada !== null && idDaLinhaAtualmenteEditada !== id) {
        alert('Conclua a edição da linha atual antes de editar outra.');
        return;
    }

    var linha = event.currentTarget.closest('tr');
    var selectElement = linha.querySelector(`#tipoSelect-${id}`);
    var editarButton = linha.querySelector('.editarBT');
    var salvarButton = linha.querySelector('.salvarBT');
    
    selectElement.removeAttribute('disabled');
    editarButton.style.display = 'none';
    salvarButton.style.display = 'inline-block'; // Use 'inline-block' para exibir o botão "Salvar"

    idDaLinhaAtualmenteEditada = id;
}
async function salvarEdicao(id, idUsuario) {

    const selectElement = document.querySelector(`#tipoSelect-${id}`);
    const novoTipo = selectElement.value;

    const data = {
        id: idUsuario,
        novoTipo: novoTipo
    };

    try {
        const response = await fetch('/usuarioUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                alert('Sucesso ao atualizar o tipo de usuário.');
            } else {
                alert('Falha ao atualizar o tipo de usuário.');
            }
        } else {
            alert('Erro na solicitação HTTP');
        }
    } catch (error) {
        console.error('Erro na solicitação HTTP:', error);
    } finally {
        const linha = document.querySelector(`#linha-${id}`);
        const editarButton = linha.querySelector('.editarBT');
        const salvarButton = linha.querySelector('.salvarBT');

        selectElement.setAttribute('disabled', 'disabled');
        editarButton.style.display = 'inline-block';
        salvarButton.style.display = 'none';

        idDaLinhaAtualmenteEditada = null;
    }
}