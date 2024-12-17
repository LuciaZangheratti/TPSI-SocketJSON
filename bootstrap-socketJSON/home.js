// Carica il file JSON e popola dinamicamente il contenuto della pagina
fetch('json/home.json')
    .then(response => response.json())
    .then(data => {
        // Popolamento Navbar
        const navbarList = document.getElementById('navbarList');
        data.navbar.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('nav-item');
            li.innerHTML = `<a class="nav-link text-white" href="${item.link}">${item.text}</a>`;
            navbarList.appendChild(li);
        });

        // Popolamento Introduzione
        document.getElementById('introTitle').innerText = data.intro.title;
        const introParagraphs = document.getElementById('introParagraphs');
        data.intro.paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerText = paragraph;
            introParagraphs.appendChild(p);
        });
        document.getElementById('videoSource').src = data.intro.video;

        // Popolamento Contenuti
        document.getElementById('contentTitle').innerText = "Cosa imparerai in questo sito?";
        document.getElementById('contentDescription').innerText = "Comprenderai i fondamenti dei socket e come vengono utilizzati nella comunicazione di rete.";

        const contentCards = document.getElementById('contentCards');
        data.content.forEach(item => {
            const col = document.createElement('div');
            col.classList.add('col-md-6', 'mb-4');
            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            `;
            contentCards.appendChild(col);
        });
    })
    .catch(error => console.error('Error fetching JSON data:', error));

