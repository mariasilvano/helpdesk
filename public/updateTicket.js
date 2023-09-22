main.style.display = 'none';

$.ajax({
    url: '/categorias',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        const select = document.getElementById('selCategoria');
        select.innerHTML = "<option value=''>Selecione uma categoria</option>";

        // Recuperar a categoria atual do atributo de dados personalizado
        const categoriaAtual = select.getAttribute('data-categoria');

        // Preencher o select com as opções retornadas
        data.forEach(function (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
            
            if (option.value == categoriaAtual) { 
                select.value = option.value; 
            }
        });
    },
    error: function (error) {
        console.error('Erro ao buscar as categorias:', error);
    },
});

$.ajax({
    url: '/tecnicos',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        const select = document.getElementById('selTecnico');
        select.innerHTML = "<option value=''>Selecione um técnico</option>";

        const tecAtual = select.getAttribute('data-tecnico');

        // Preencher o select com as opções retornadas
        data.forEach(function (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
            
            if (option.value == tecAtual) { 
                select.value = option.value; 
            }
        });
    },
    error: function (error) {
        console.error('Erro ao buscar técnicos:', error);
    },
});