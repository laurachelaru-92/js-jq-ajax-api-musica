$(document).ready(function() {

// Chiamare l'API di boolean
var endpoint = "https://flynn.boolean.careers/exercises/api/array/music";

// Prendere il template Handlebars e farne il compile
var fonte = $("#cd-template").html();
var template = Handlebars.compile(fonte);

// Salviamo gli album in un array
var tuttiAlbum = [];
// Di default, sono appesi in pagina tutti i cd
$.ajax({
  "url": endpoint,
  "method": "GET",
  "success": function(dati, stato) {
    // Mettiamo l'array "response" in una variabile
    var risultati = dati.response;
    // Appendiamo tutti gli elementi di "risultati" in HTML
    for(var i = 0; i < risultati.length; i++) {
      tuttiAlbum.push(risultati[i]);
      $(".cds-container").append(template(risultati[i]));
    }
  },
  "error": function(richiesta, stato, errori) {
    alert("Trovato un errore!");
  }
});
// Settiamo il value della select a "all"
$("#genere-musicale").val("All");

// BONUS: Creare una select con le opzioni dei generi musicali pop, rock, metal e jazz, e far apparire solo i cd del genere scelto
// Creiamo un evento al cambiamento del valore della select
$("#genere-musicale").change(function(){
  $(".cds-container .cd").show();
  // Salviamo il genere in una variabile
  var genereMusicale = $(this).val();
  // Eseguiamo questo codice solo se i generi sono diversi da "All"
  if(genereMusicale != "All") {
    // Creiamo un array degli autori del genere selezionato
    var autoriGiusti = [];
    // Iteriamo nell'array degli album per trovare gli autori del genere selezionato
    for(var i = 0; i < tuttiAlbum.length; i++) {
      if(tuttiAlbum[i].genre == genereMusicale) {
        autoriGiusti.push(tuttiAlbum[i].author);
      }
    }
    // Nascondiamo i .cd che non sono presenti in autoriGiusti
    $(".cds-container .cd").each(function(){
      var autoreCd = $(this).children(".author").text();
      if(!autoriGiusti.includes(autoreCd)) {
        $(this).hide();
      }
    });
  }
});


});
