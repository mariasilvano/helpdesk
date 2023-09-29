main.style.display = 'none';


$(document).ready(function() {
    var tecnicoId = $("#selTecnico").data("tecnico");
    var categoriaId = $("#selCategoria").data("categoria");
    
    $("#selTecnico").val(tecnicoId);
    $("#selCategoria").val(categoriaId);
});