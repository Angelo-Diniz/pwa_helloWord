$(document).ready(function () {  

    if(window.location.href == "http://localhost/RECEITA_TRABLHO/index.html#" || window.location.href == "http://localhost/RECEITA_TRABLHO/") {
        carregaConteudoHome();
    }

    $(document).on('click', '#verReceita', function(){
        var target = $(this).closest('[data-id]');
        var id = target.data('id');
        carregaReceita(id);
    });
    $(document).on('click', '#votar', function(){
        var target = $(this).closest('[data-id]');
        var id = target.data('id');
        votarAgora(id);
        location.reload();
    });

    $("#btnCriarReceita").click(function (){
        if ($("#nome").val() == "" || $("#url").val() == "" || $("#receita").val() == ""){
            alert("Favor preencher todos os campos")
        }
        else {
            var receita = {
                nome : $("#nome").val(),
                url :  $("#url").val(),
                receita : $("#receita").val()
            }

            criarReceita(receita);

            alert("Receita criada!")
            location.reload();

        }
        
    });

});

//funções auxiliares

function criarReceita(receita) {
    $.ajax({
        method: "POST",
        url: "criaReceita.php",
        data: { 
            receita: receita.receita,
            nome:  receita.nome,
            url: receita.url
        }
      })
      .done(function( retorno ) {
          console.log(retorno)
      });
}


function votarAgora (id) {
    $.ajax({
        method: "POST",
        url: "produtoVotar.php",
        data: { id: id }
      })
      .done(function( retorno ) {
          console.log(retorno)
      });
}

function carregaConteudoHome () {

    $.ajax({
        method: "POST",
        url: "receitas.php"
      })
      .done(function( retorno ) {
          
          if(retorno =="[]"){
              $("#conteudo").html("Receita não encontrada!");
          }else{
              $("#conteudo").html("");
          
              $.each(JSON.parse(retorno), function (key, item){
                  $("#conteudo").append(template_receitas(item['nome'], item['url'], item['votos'], item['id']));
              });
          }
      });
}

function carregaReceita (id) {
        if(id == ""){
            id = true;
        }
        console.log(id);
        
        $.ajax({
            method: "POST",
            url: "receita.php",
            data: { id: id }
        })
        .done(function( retorno ) {
            if(retorno =="[]"){
                $("#conteudo").html("Produto não encontrado!");
            }else{
                $("#conteudo").html("");
                console.log(retorno)
                $.each(JSON.parse(retorno), function (key, item){
                    $("#conteudoReceita").append(templatePaginaReceita(item['nome'], item['url'], item['votos'], item['id'], item['receita']));
                });
            }
        });			
}

var template_receitas = function(nome, url, votos, id) {
    return ""+
    "<div class='card col-sm-12 col-md-4' style='width: 18rem;' data-id="+id+">" + 
        "<img class='card-img-top' src='"+url+" ' alt='receita imagem'>"+
        "<div class='card-body'>"+
            "<h5 class='card-title'>"+nome+"</h5>"+
            "<p class='card-text'>Votos: "+votos+"</p>"+
            "<button col-md-3' id='votar' type='button' class='btn btn-dark'>Votar</button>"+
        "</div>"+
        "<button id='verReceita' type='button' class='btn btn-info'>Ver Receita</button></div>"+
    "</div>";
}

var templatePaginaReceita= function (nome,url, votos, id, receita) {
     return "<div class='row'> <div class='imagem col-md-6'>"+
        "    <img src='"+url+"'"+
        "        alt='imagem receita'>"+
        "</div>"+
        "<div id='descricao' class='col-md-6' data-id="+id+">"+
        "    <h1>"+nome+"</h1>"+
        "    <p>"+receita+"</p>"+
        "    <p>Votos: "+votos+"</p>"+
        "    <button type='button' id='votar' class='btn btn-dark'>Votar</button>"+
        "</div>" + 
        "</div>"
}