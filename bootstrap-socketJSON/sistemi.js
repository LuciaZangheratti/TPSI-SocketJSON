document.addEventListener("DOMContentLoaded", () => {
    fetch("json/sistemi.json")
        .then(response => response.json())
        .then(data => {
            // Caricamento Header
            document.getElementById("header-title").textContent = data.header.titolo;
            document.getElementById("header-description").textContent = data.header.descrizione;

            // Caricamento Introduzione
            document.getElementById("intro-title").textContent = data.introduzione.titolo;
            document.getElementById("intro-description").textContent = data.introduzione.descrizione;

            // Caricamento Sezione Applicazioni
            const appList = document.getElementById("app-list");
            data.applicazioni.forEach(app => {
                const col = document.createElement("div");
                col.className = "col-md-6 mb-4";
                col.innerHTML = `
                    <div class="card bg-light shadow-sm h-100">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${app.titolo}</h5>
                            <p class="card-text">${app.descrizione}</p>
                        </div>
                    </div>
                `;
                appList.appendChild(col);
            });

            // Caricamento Footer
            document.getElementById("footer-autore").textContent = data.footer.autore;
            document.getElementById("footer-classe").textContent = data.footer.classe;
            document.getElementById("footer-anno").textContent = data.footer.anno;

            // Gestione Navbar
            const navbarLinks = [
                { name: "Homepage", url: "homepage.html" },
                { name: "Che cos'è un Socket", url: "p1.html" },
                { name: "Informatica", url: "info.html" },
                { name: "Glossario", url: "glossario.html" }
            ];
            const navbarContainer = document.getElementById("navbar-links");
            navbarLinks.forEach(link => {
                const li = document.createElement("li");
                li.className = "nav-item";
                li.innerHTML = `<a class="nav-link text-white" href="${link.url}">${link.name}</a>`;
                navbarContainer.appendChild(li);
            });
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));
});
