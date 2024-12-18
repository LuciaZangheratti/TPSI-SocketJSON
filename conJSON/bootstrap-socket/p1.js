// Aggiunge un listener per l'evento DOMContentLoaded per assicurarsi che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    // Effettua una richiesta Fetch per recuperare il file JSON 'p1.json'
    fetch("json/p1.json")
        .then((response) => response.json()) // Converte la risposta HTTP in un oggetto JSON
        .then((data) => {
            // **Popolamento della sezione Introduzione**
            const intro = document.getElementById("introduzione"); // Seleziona l'elemento con ID 'introduzione'
            intro.innerHTML = `
                <div class="container text-center">
                    <h1 class="mb-4 fw-bold">${data.introduzione.titolo}</h1> <!-- Titolo dell'introduzione -->
                    <p>${data.introduzione.descrizione}</p> <!-- Descrizione introduttiva -->
                </div>
            `;

            // **Popolamento della sezione 1**
            const sezione1 = document.getElementById("sezione1"); // Seleziona l'elemento con ID 'sezione1'
            let paragrafi = ""; // Inizializza una stringa vuota per i paragrafi
            data.sezione1.paragrafi.forEach((p) => {
                paragrafi += `<p>${p}</p>`; // Crea un elemento <p> per ogni paragrafo
            });
            sezione1.innerHTML = `
                <div class="container">
                    <h2 class="fw-bold" style="color: #003f5c;">${data.sezione1.titolo}</h2> <!-- Titolo della sezione -->
                    ${paragrafi} <!-- Inserisce i paragrafi generati -->
                </div>
            `;

            // **Popolamento della sezione 2**
            const sezione2 = document.getElementById("sezione2"); // Seleziona l'elemento con ID 'sezione2'
            let tipiSocket = ""; // Inizializza una stringa vuota per i tipi di socket
            data.sezione2.tipi.forEach((tipo) => {
                tipiSocket += `<li><strong>${tipo.nome}:</strong> ${tipo.descrizione}</li>`; // Crea un elemento <li> per ogni tipo
            });
            sezione2.innerHTML = `
                <div class="container">
                    <h2 class="fw-bold">${data.sezione2.titolo}</h2> <!-- Titolo della sezione -->
                    <p>${data.sezione2.descrizione}</p> <!-- Descrizione della sezione -->
                    <ul>${tipiSocket}</ul> <!-- Inserisce i tipi di socket generati -->
                </div>
            `;

            // **Popolamento della sezione 3 con immagine**
            const sezione3 = document.getElementById("sezione3"); // Seleziona l'elemento con ID 'sezione3'
            let punti = ""; // Inizializza una stringa vuota per i punti elenco
            data.sezione3.punti.forEach((punto) => {
                punti += `<li>${punto}</li>`; // Crea un elemento <li> per ogni punto
            });
            sezione3.innerHTML = `
                <div class="container text-center">
                    <h2 class="fw-bold" style="color: #003f5c;">${data.sezione3.titolo}</h2> <!-- Titolo della sezione -->
                    <p>${data.sezione3.descrizione}</p> <!-- Descrizione della sezione -->
                    <ol>${punti}</ol> <!-- Inserisce i punti generati in un elenco ordinato -->
                    <img src="${data.sezione3.immagine}" alt="Esempio di socket" class="img-fluid rounded mt-4 shadow-sm"> <!-- Immagine con classi di stile -->
                </div>
            `;
        })
        // **Gestione degli errori**
        .catch((error) => console.error("Errore nel caricamento JSON:", error)); // Logga eventuali errori nella console
});
