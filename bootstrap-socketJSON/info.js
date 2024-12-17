document.addEventListener("DOMContentLoaded", () => {
    fetch("json/info.json")
        .then((response) => response.json())
        .then((data) => {
            // Popolamento header
            const headerTitolo = document.getElementById("header-titolo");
            if (data.header && data.header.titolo) {
                headerTitolo.textContent = data.header.titolo;
            }

            // Popolamento progetti
            const progettiContainer = document.getElementById("progetti-container");
            let progettiHTML = "";

            if (data.progetti && Array.isArray(data.progetti)) {
                data.progetti.forEach((progetto) => {
                    progettiHTML += `
                        <div class="col-md-6 mb-4">
                            <div class="card bg-light shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${progetto.titolo}</h5>
                                    <p class="card-text">${progetto.descrizione}</p>
                                    <h6 class="fw-bold">Tecnologie</h6>
                                    <ul>
                                        ${progetto.tecnologie.map(tech => `<li>${tech}</li>`).join("")}
                                    </ul>
                                    ${progetto.funzioni && progetto.funzioni.length > 0 ? `
                                        <h6 class="fw-bold">Funzionalità</h6>
                                        <ul>
                                            ${progetto.funzioni.map(funzione => `<li>${funzione}</li>`).join("")}
                                        </ul>
                                    ` : ""}
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            progettiContainer.innerHTML = progettiHTML;

            // Aggiungi immagine alla fine come colonna
            if (data.projectImage) {
                const imgCol = document.createElement('div');
                imgCol.classList.add('col-md-6', 'align-self-end', 'mb-4'); // Colonna Bootstrap

                const imgElement = document.createElement('img');
                imgElement.src = data.projectImage;
                imgElement.alt = 'Progetto Socket';
                imgElement.classList.add('img-fluid', 'rounded', 'shadow-sm'); // Styling immagine

                imgCol.appendChild(imgElement);
                progettiContainer.appendChild(imgCol); // Aggiungi alla griglia
            }
        })
        .catch((error) => console.error("Errore nel caricamento JSON:", error));
});
