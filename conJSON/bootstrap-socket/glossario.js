// Aggiunge un listener per l'evento DOMContentLoaded per garantire che il DOM sia completamente caricato prima di eseguire il codice.
document.addEventListener("DOMContentLoaded", () => {

    // Effettua una richiesta Fetch al file JSON 'json/glossario.json' che contiene i termini del glossario.
    fetch('json/glossario.json')
        .then(response => response.json()) // Converte la risposta HTTP in un oggetto JSON.
        .then(data => {
            // Se la conversione ha successo, seleziona l'elemento con ID 'glossario-terms' dal DOM.
            const glossarioTermsContainer = document.getElementById('glossario-terms');
            
            // Itera attraverso l'array 'terms' presente nei dati JSON.
            data.terms.forEach(term => {
                // Crea un elemento <div> per rappresentare un singolo termine.
                const termCard = document.createElement('div');
                
                // Aggiunge classi Bootstrap per la disposizione e il margine.
                termCard.classList.add('col-md-6', 'mb-4');
                
                // Imposta il contenuto HTML del termine, inclusi il nome e la definizione.
                termCard.innerHTML = `
                    <div class="term-card">
                        <h5>${term.name}</h5> <!-- Nome del termine -->
                        <p>${term.definition}</p> <!-- Definizione del termine -->
                    </div>
                `;
                
                // Aggiunge il termine creato come figlio del contenitore principale.
                glossarioTermsContainer.appendChild(termCard);
            });
        })
        .catch(error => {
            // Gestisce eventuali errori nel caricamento del file JSON o nella sua elaborazione.
            console.error('Errore nel caricamento del glossario:', error);
        });
});
