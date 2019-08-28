function init() {

  getTodoItems();


  $(document).on("click", ".delete", deleteItem);
  $(document).on("click", "#submit", addItem);
}

$(document).ready(init);

function clearItems(){
  var theContainer = $(".container");
  theContainer.children().remove();
}

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
        console.log("successo!");
        getTodoItems();
      },
      error: function () {
        alert("errore");
      }
    })
  }
}

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
