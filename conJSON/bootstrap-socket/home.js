// Recupera il file JSON 'home.json' e popola dinamicamente il contenuto della pagina
fetch('json/home.json')
    .then(response => response.json()) // Converte la risposta HTTP in un oggetto JSON
    .then(data => {
        // **Popolamento della Navbar**
        // Seleziona l'elemento della navbar nel DOM
        const navbarList = document.getElementById('navbarList');
        // Itera sugli elementi della navbar presenti nel file JSON
        data.navbar.forEach(item => {
            // Crea un elemento <li> per ogni voce della navbar
            const li = document.createElement('li');
            li.classList.add('nav-item'); // Aggiunge la classe Bootstrap 'nav-item'
            // Imposta il contenuto HTML del <li> con un link <a>
            li.innerHTML = `<a class="nav-link text-white" href="${item.link}">${item.text}</a>`;
            navbarList.appendChild(li); // Aggiunge l'elemento <li> alla navbar
        });

        // **Popolamento della sezione di introduzione**
        // Imposta il titolo dell'introduzione
        document.getElementById('introTitle').innerText = data.intro.title;

        // Seleziona il contenitore dei paragrafi e aggiunge i testi
        const introParagraphs = document.getElementById('introParagraphs');
        data.intro.paragraphs.forEach(paragraph => {
            const p = document.createElement('p'); // Crea un nuovo elemento <p>
            p.innerText = paragraph; // Imposta il testo del paragrafo
            introParagraphs.appendChild(p); // Aggiunge il paragrafo al contenitore
        });

        // Imposta la sorgente del video
        document.getElementById('videoSource').src = data.intro.video;

        // **Popolamento della sezione dei contenuti principali**
        // Imposta il titolo della sezione contenuti
        document.getElementById('contentTitle').innerText = "Cosa imparerai in questo sito?";
        // Imposta una descrizione generica
        document.getElementById('contentDescription').innerText = "Comprenderai i fondamenti dei socket e come vengono utilizzati nella comunicazione di rete.";

        // Seleziona il contenitore per le card dei contenuti
        const contentCards = document.getElementById('contentCards');
        // Itera sugli elementi della sezione contenuti presenti nel file JSON
        data.content.forEach(item => {
            const col = document.createElement('div'); // Crea un nuovo elemento <div>
            col.classList.add('col-md-6', 'mb-4'); // Aggiunge classi Bootstrap per layout e margine
            // Imposta il contenuto HTML della card
            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            `;
            contentCards.appendChild(col); // Aggiunge la card al contenitore
        });
    })
    // **Gestione degli errori**
    // Cattura eventuali errori durante il caricamento o l'elaborazione del file JSON
    .catch(error => console.error('Error fetching JSON data:', error));
