$(document).ready(
  function() {
    //visualizzo la lista
    getElement();

    //avvia funzione al click sul bottone "Aggiungi"
    $(".add").click(function(){
      addElement();
    });

    //avvia funzione alla pressione del tasto invio (13) sull'input
    $(".input").keyup(function(){
      if (event.which === 13){
        addElement();
      }
    });

    //avvia funzione al click sul bottone "X" (cancella)
    $(document).on("click", ".delete", function(){
      var this_attr = $(this).parents(".todo-list-element").attr("data-attr");
      removeElement(this_attr);
    });
  }
);

//FUNZIONE visualizza elementi
function getElement(){
  $.ajax(
    {
      url: "http://157.230.17.132:3018/todos/",
      method: "GET",
      success: function (data) {
        //reset
        $(".todo-list").html("");
        $(".input").val("");

        //Handlebars
        var source = $("#template").html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < data.length; i++){
          var dati = {
            id: data[i].id,
            text: data[i].text,
          };

          var html = template(dati);
          $(".todo-list").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    }
  );
}

//FUNZIONE aggiunta elemento
function addElement(){
  var todoElemento = $(".input").val();
  if (todoElemento != ""){
    $.ajax(
      {
        url: "http://157.230.17.132:3018/todos/",
        method: "POST",
        data: {
          "text" : todoElemento,
        },
        success: function () {
          getElement();
        },
        error: function () {
          alert("E' avvenuto un errore.");
        }
      }
    );
  }
}

//FUNZIONE rimozione elemento
function removeElement(this_attr){
  $.ajax(
    {
      url: "http://157.230.17.132:3018/todos/" + this_attr,
      method: "DELETE",
      success: function () {
        getElement();
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    }
  );
}
