$(document).ready(function() {

// Chiamare l'API di boolean
var endpoint = "https://flynn.boolean.careers/exercises/api/array/music";

// Prendere il template Handlebars e farne il compile
var fonte = $("#cd-template").html();
var template = Handlebars.compile(fonte);

// Di default, sono appesi in pagina tutti i cd
$.ajax({
  "url": endpoint,
  "method": "GET",
  "success": function(dati, stato) {
    // Mettiamo l'array "response" in una variabile
    var risultati = dati.response;
    // Appendiamo tutti gli elementi di "risultati" in HTML
    for(var i = 0; i < risultati.length; i++) {
      $(".cds-container").append(template(risultati[i]));
    }
  },
  "error": function(richiesta, stato, errori) {
    alert("Trovato un errore!");
  }
});

// BONUS: Creare una select con le opzioni dei generi musicali pop, rock, metal e jazz, e far apparire solo i cd del genere scelto
// Creiamo un evento al click
$("#genere-musicale > option").click(function(){
  // Salviamo il genere in una variabile
  var genereMusicale = $(this).val();
  // Rimuoviamo i cd appesi in pagina
  $(".cds-container .cd").remove();
  // Se il genere è diverso da "all", appendiamo gli autori giusti
  if (genereMusicale != "All") {
    $.ajax({
      "url": endpoint,
      "method": "GET",
      "success": function(dati, stato) {
        var risultati = dati.response;
        for(var i = 0; i < risultati.length; i++) {
          if(risultati[i].genre == genereMusicale) {
            $(".cds-container").append(template(risultati[i]));
          }
        }
      },
      "error": function(richiesta, stato, errori) {
        alert("Errore");
      }
    });
  } else {               // Altrimenti ri-appendiamo tutti i cd
    $.ajax({
      "url": endpoint,
      "method": "GET",
      "success": function(dati, stato) {
        // Mettiamo l'array "response" in una variabile
        var risultati = dati.response;
        // Appendiamo tutti gli elementi di "risultati" in HTML
        for(var i = 0; i < risultati.length; i++) {
          $(".cds-container").append(template(risultati[i]));
        }
      },
      "error": function(richiesta, stato, errori) {
        alert("Trovato un errore!");
      }
    });

  }
});


});
