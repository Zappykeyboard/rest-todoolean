function init() {

  getTodoItems();


  $(document).on("click", ".delete", deleteItem);
  $(document).on("click", "#submit", addItem);
  $(document).on("click", ".update", updateItem);
}

$(document).ready(init);

//aggiorno l'elemento
function updateItem(){
  var element = $(this);
  var theBox = element.parent();
  var theId = theBox.data("id");

  var theText = prompt("Inserisci il nuovo testo...");
  //console.log("voglio aggiornare elemento con ID: " + theId);

  $.ajax({
    url: "http://157.230.17.132:3001/todos/"+theId,
    method: "PUT",
    data: {
      text: theText
    },
    success: function(){
      console.log("elemento modificato!");
      getTodoItems();
    },
    error:function(){
      alert("errore");
    }
  })
}

//rimuovo i vecchi elementi dalla lista
function clearItems(){
  var theContainer = $(".container");
  theContainer.children().remove();
}

//aggiungo un nuovo elemento partendo dal campo di testo
function addItem(){
  var element = $(this);
  var theTextBox = element.siblings("#text-box");
  var theText = theTextBox.val();
  console.log(theText);

  if (theText){
    $.ajax({
      url: "http://157.230.17.132:3001/todos/",
      method: "POST",
      data: {
        text: theText
      },
      success: function(){
        console.log("elemento aggiunto!");
        getTodoItems();
      },
      error: function () {
        alert("errore");
      }
    })
  }
}

//cancello l'elemento
function deleteItem() {
  var element = $(this);
  var theBox = element.parent();
  var theId = theBox.data("id");

  //console.log(theId);

  $.ajax({
    url: "http://157.230.17.132:3001/todos/" + theId,
    method: "DELETE",
    success: function () {
      console.log("cancellato item con ID: " + theId);

      theBox.remove();

    },
    error: function () {
      alert("errore");
    }
  })
}

//recupero gli elementi dal server
function getTodoItems() {
  clearItems();

  $.ajax({
    url: "http://157.230.17.132:3001/todos/",
    method: "GET",
    success: function (data) {
      console.log(data);
      printItems(data);
    },
    error: function () {
      alert("errore");
    }

  })

}

//inserisco gli elementi nell'html
function printItems(toDoItems) {

  var theContainer = $(".container");

  var hTodoTemplate = $("#item-template").html();
  var compiledTemplate = Handlebars.compile(hTodoTemplate);

  for (var i = 0; i < toDoItems.length; i++) {

    var item = toDoItems[i];

    var context = {
      text: item.text,
      id: item.id
    };

    var html = compiledTemplate(context);

    theContainer.append(html);
  }

}
