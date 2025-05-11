function fetchFormations() {
  fetch('http://localhost:3000/formations')
  .then(response => response.json())
  .then(formations => {
      const container = document.getElementById('formations');
      container.innerHTML = '';

      formations.forEach(formation => {
          const formationDiv = document.createElement('div');
          formationDiv.className = 'card col-md-4 m-3 shadow-lg';

          formationDiv.innerHTML = `
          <img src="${formation.photo}" alt="${formation.title}" class="card-img-top">
          <div class="card-body">
              <h2 class="text-warning">${formation.title}</h2>
              <h3>Volume horaire: ${formation.volumeHoraire || "Non spécifié"}</h3>
              <h3>Formateur: ${formation.formateur || "Non spécifié"}</h3>
              <button class="btn btn-outline-light mt-2">Voir plus</button>
          </div>`;

          // ✅ Ajout de l'ID dans la redirection
          formationDiv.addEventListener('click', () => {
              window.location.href = `/Formation1?id=${formation.id}`;
          });

          container.appendChild(formationDiv);
      });
  })
  .catch(error => {
      console.error('Erreur de fetch API:', error);
      document.getElementById('formations').innerHTML = 
          `<p class="text-danger">Une erreur s'est produite lors du chargement des formations.</p>`;
  });
}

fetchFormations();

function fetchFormations1(){
  const id = new URLSearchParams(window.location.search).get('id');

  if (!id) {
      console.error("ID manquant dans l'URL !");
      document.getElementById("formation-container").innerHTML = 
          `<p class="text-danger">Formation introuvable.</p>`;
      return;
  }

  fetch(`http://localhost:3000/formations/${id}`)
  .then(response => response.json())
  .then(formation => {
      const container = document.getElementById("formation-container");

      if (!formation || !formation.title) {
          container.innerHTML = `<p class="text-danger">Formation introuvable.</p>`;
          return;
      }
      const html = `
      <div class="container mt-5">
        <div class="row align-items-center bg-light p-4 rounded shadow-lg">
          <div class="col-md-6 text-center">
            <img src="${formation.photo}" alt="${formation.title}" class="img-fluid rounded border shadow" style="max-height: 300px;">
          </div>
          <div class="col-md-6">
            <h2 class="text-primary fw-bold">${formation.title}</h2>
            <p class="text-muted"><strong>Volume horaire:</strong> ${formation.volumeHoraire || "Non spécifié"}</p>
            <p class="text-muted"><strong>Formateur:</strong> ${formation.formateur || "Non spécifié"}</p>
            <p class="text-dark"><strong>Description:</strong> ${formation.description || "Aucune description disponible."}</p>
            <button class="btn btn-warning mt-3 px-4 py-2 shadow">S'inscrire</button>
          </div>
        </div>
      </div>
    `;
    

      container.innerHTML = html;
  })
  .catch(error => {
      console.error("Erreur lors du chargement de la formation :", error);
  });
}

fetchFormations1();

