// Aggiunge un listener per l'evento DOMContentLoaded per garantire che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    // Effettua una richiesta Fetch per recuperare il file JSON 'info.json'
    fetch("json/info.json")
        .then((response) => response.json()) // Converte la risposta HTTP in un oggetto JSON
        .then((data) => {
            // **Popolamento dell'header**
            const headerTitolo = document.getElementById("header-titolo");
            if (data.header && data.header.titolo) { // Verifica che l'oggetto `header` e la proprietà `titolo` esistano
                headerTitolo.textContent = data.header.titolo; // Imposta il testo dell'header
            }

            // **Popolamento dei progetti**
            const progettiContainer = document.getElementById("progetti-container");
            let progettiHTML = ""; // Inizializza una stringa vuota per costruire il contenuto HTML

            if (data.progetti && Array.isArray(data.progetti)) { // Verifica che `progetti` sia un array
                data.progetti.forEach((progetto) => {
                    // Aggiunge una card per ogni progetto
                    progettiHTML += `
                        <div class="col-md-6 mb-4">
                            <div class="card bg-light shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${progetto.titolo}</h5> <!-- Titolo del progetto -->
                                    <p class="card-text">${progetto.descrizione}</p> <!-- Descrizione del progetto -->
                                    <h6 class="fw-bold">Tecnologie</h6> <!-- Sezione delle tecnologie -->
                                    <ul>
                                        ${progetto.tecnologie.map(tech => `<li>${tech}</li>`).join("")} <!-- Lista delle tecnologie -->
                                    </ul>
                                    ${progetto.funzioni && progetto.funzioni.length > 0 ? `
                                        <h6 class="fw-bold">Funzionalità</h6> <!-- Sezione delle funzionalità -->
                                        <ul>
                                            ${progetto.funzioni.map(funzione => `<li>${funzione}</li>`).join("")} <!-- Lista delle funzionalità -->
                                        </ul>
                                    ` : ""} <!-- Mostra le funzionalità solo se esistono -->
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            progettiContainer.innerHTML = progettiHTML; // Inserisce il contenuto HTML generato nel contenitore dei progetti

            // **Aggiunta di un'immagine alla fine della griglia**
            if (data.projectImage) { // Verifica che esista una proprietà `projectImage`
                const imgCol = document.createElement('div'); // Crea un nuovo elemento <div> per contenere l'immagine
                imgCol.classList.add('col-md-6', 'align-self-end', 'mb-4'); // Aggiunge classi Bootstrap per layout e margine

                const imgElement = document.createElement('img'); // Crea un elemento immagine <img>
                imgElement.src = data.projectImage; // Imposta la sorgente dell'immagine
                imgElement.alt = 'Progetto Socket'; // Imposta il testo alternativo
                imgElement.classList.add('img-fluid', 'rounded', 'shadow-sm'); // Aggiunge classi Bootstrap per il layout e lo stile

                imgCol.appendChild(imgElement); // Aggiunge l'immagine alla colonna
                progettiContainer.appendChild(imgCol); // Aggiunge la colonna al contenitore dei progetti
            }
        })
        // **Gestione degli errori**
        .catch((error) => console.error("Errore nel caricamento JSON:", error)); // Logga eventuali errori nella console
});
