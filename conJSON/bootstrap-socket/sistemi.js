// Aggiunge un listener all'evento DOMContentLoaded per eseguire il codice solo dopo che il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", () => {
    // Effettua una richiesta Fetch per ottenere il file JSON 'sistemi.json'
    fetch("json/sistemi.json")
        .then(response => response.json()) // Converte la risposta HTTP in un oggetto JSON
        .then(data => {
            // **Caricamento Header**
            // Popola dinamicamente il titolo e la descrizione dell'header
            document.getElementById("header-title").textContent = data.header.titolo; // Imposta il titolo
            document.getElementById("header-description").textContent = data.header.descrizione; // Imposta la descrizione

            // **Caricamento Introduzione**
            // Popola dinamicamente il titolo e la descrizione della sezione di introduzione
            document.getElementById("intro-title").textContent = data.introduzione.titolo; // Titolo dell'introduzione
            document.getElementById("intro-description").textContent = data.introduzione.descrizione; // Descrizione dell'introduzione

            // **Caricamento Sezione Applicazioni**
            // Seleziona il contenitore dove verranno inserite le applicazioni
            const appList = document.getElementById("app-list");
            data.applicazioni.forEach(app => {
                // Crea dinamicamente un elemento per ogni applicazione
                const col = document.createElement("div");
                col.className = "col-md-6 mb-4"; // Classi di stile Bootstrap
                col.innerHTML = `
                    <div class="card bg-light shadow-sm h-100"> <!-- Card Bootstrap -->
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${app.titolo}</h5> <!-- Titolo applicazione -->
                            <p class="card-text">${app.descrizione}</p> <!-- Descrizione applicazione -->
                        </div>
                    </div>
                `;
                appList.appendChild(col); // Aggiunge la card al contenitore
            });

            // **Caricamento Footer**
            // Popola dinamicamente i dati del footer
            document.getElementById("footer-autore").textContent = data.footer.autore; // Nome dell'autore
            document.getElementById("footer-classe").textContent = data.footer.classe; // Classe
            document.getElementById("footer-anno").textContent = data.footer.anno; // Anno

            // **Gestione Navbar**
            // Definisce i collegamenti della navbar
            const navbarLinks = [
                { name: "Homepage", url: "homepage.html" }, // Link alla Homepage
                { name: "Che cos'è un Socket", url: "p1.html" }, // Link alla pagina sui Socket
                { name: "Informatica", url: "info.html" }, // Link alla sezione Informatica
                { name: "Glossario", url: "glossario.html" } // Link al Glossario
            ];
            const navbarContainer = document.getElementById("navbar-links"); // Seleziona il contenitore della navbar
            navbarLinks.forEach(link => {
                // Crea dinamicamente ogni elemento della navbar
                const li = document.createElement("li");
                li.className = "nav-item"; // Classe per lo stile degli elementi della navbar
                li.innerHTML = `<a class="nav-link text-white" href="${link.url}">${link.name}</a>`; // Link con testo e URL
                navbarContainer.appendChild(li); // Aggiunge l'elemento alla navbar
            });
        })
        // **Gestione degli errori**
        .catch(error => console.error("Errore nel caricamento dei dati:", error)); // Logga eventuali errori nella console
});
