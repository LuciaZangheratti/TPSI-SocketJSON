document.addEventListener("DOMContentLoaded", () => {
  fetch("json/p1.json")
      .then((response) => response.json())
      .then((data) => {
          // Popolamento Introduzione
          const intro = document.getElementById("introduzione");
          intro.innerHTML = `
              <div class="container text-center">
                  <h1 class="mb-4 fw-bold">${data.introduzione.titolo}</h1>
                  <p>${data.introduzione.descrizione}</p>
              </div>
          `;

          // Sezione 1
          const sezione1 = document.getElementById("sezione1");
          let paragrafi = "";
          data.sezione1.paragrafi.forEach((p) => {
              paragrafi += `<p>${p}</p>`;
          });
          sezione1.innerHTML = `
              <div class="container">
                  <h2 class="fw-bold" style="color: #003f5c;">${data.sezione1.titolo}</h2>
                  ${paragrafi}
              </div>
          `;

          // Sezione 2
          const sezione2 = document.getElementById("sezione2");
          let tipiSocket = "";
          data.sezione2.tipi.forEach((tipo) => {
              tipiSocket += `<li><strong>${tipo.nome}:</strong> ${tipo.descrizione}</li>`;
          });
          sezione2.innerHTML = `
              <div class="container">
                  <h2 class="fw-bold">${data.sezione2.titolo}</h2>
                  <p>${data.sezione2.descrizione}</p>
                  <ul>${tipiSocket}</ul>
              </div>
          `;

          // Sezione 3 con immagine
          const sezione3 = document.getElementById("sezione3");
          let punti = "";
          data.sezione3.punti.forEach((punto) => {
              punti += `<li>${punto}</li>`;
          });
          sezione3.innerHTML = `
              <div class="container text-center">
                  <h2 class="fw-bold" style="color: #003f5c;">${data.sezione3.titolo}</h2>
                  <p>${data.sezione3.descrizione}</p>
                  <ol>${punti}</ol>
                  <img src="${data.sezione3.immagine}" alt="Esempio di socket" class="img-fluid rounded mt-4 shadow-sm">
              </div>
          `;
      })
      .catch((error) => console.error("Errore nel caricamento JSON:", error));
});
