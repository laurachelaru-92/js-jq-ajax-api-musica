$(document).ready(function() {

// Chiamare l'API di boolean
var endpoint = "https://flynn.boolean.careers/exercises/api/array/music";

// Prendere il template Handlebars e farne il compile
var fonte = $("#cd-template").html();
var template = Handlebars.compile(fonte);

// L'app restituisce una decina di dischi musicali
$.ajax({
  "url": endpoint,
  "method": "GET",
  "success": function(dati, stato) {
    // Mettiamo l'array "response" in una variabile
    var risultati = dati.response;
    // Per ognuno degli elementi di response, che sono oggetti, appendiamo in .cds-container i valori che ci interessano. Poiché le chiavi corrispondono ai {{segnaposto}}, possiamo appendere direttamente l'elemento. Verranno presi solo chiave e valore corrispondenti ai {{segnaposto}}
    for(var i = 0; i < risultati.length; i++) {
      $(".cds-container").append(template(risultati[i]));
    }
  },
  "error": function(richiesta, stato, errori) {
    alert("Trovato un errore!");
  }
});

// BONUS: Creare una select con le opzioni dei geneti musicali pop, rock, metal e jazz, e far apparire solo i cd del genere scelto

});
