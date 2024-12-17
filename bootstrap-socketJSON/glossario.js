document.addEventListener("DOMContentLoaded", () => {
    fetch('json/glossario.json')
        .then(response => response.json())
        .then(data => {
            const glossarioTermsContainer = document.getElementById('glossario-terms');
            data.terms.forEach(term => {
                const termCard = document.createElement('div');
                termCard.classList.add('col-md-6', 'mb-4');
                termCard.innerHTML = `
                    <div class="term-card">
                        <h5>${term.name}</h5>
                        <p>${term.definition}</p>
                    </div>
                `;
                glossarioTermsContainer.appendChild(termCard);
            });
        })
        .catch(error => {
            console.error('Errore nel caricamento del glossario:', error);
        });
});
