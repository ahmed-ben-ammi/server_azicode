fetch('http://localhost:3000/formations')
    .then(response => response.json())
    .then(formations => {
        formations.forEach(formation => {
            const formationdiv = document.createElement('div');
            formationdiv.className = 'card col-4';
            formationdiv.innerHTML = `<div class='card-body'>
                <h2>${formation.nom1}</h2>
                <h2>${formation.nom2}</h2>
                <h2>${formation.nom3}</h2>
            </div>`;
            document.getElementById('formations').appendChild(formationdiv);
        });
    })
    .catch(error => console.error('Erreur de fetch API attention:', error));
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("formations");

    try {
        const response = await fetch("http://localhost:3000/formations");
        if (!response.ok) throw new Error("Erreur de récupération des formations");

        const formations = await response.json();

        formations.forEach(formation => {
            const card = document.createElement("div");
            card.className = "card m-3";
            card.innerHTML = `
                <img src="${formation.photo}" class="card-img-top" alt="${formation.title}">
                <div class="card-body">
                    <h5 class="card-title">${formation.title}</h5>
                    <p class="card-text">Formateur : ${formation.formateur}</p>
                    <button class="btn btn-primary voir-plus" data-id="${formation.id}" data-bs-toggle="modal" data-bs-target="#formationModal">Voir plus</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Ajouter un événement pour afficher les détails
        document.querySelectorAll(".voir-plus").forEach(button => {
            button.addEventListener("click", async (event) => {
                const formationId = event.target.getAttribute("data-id");
                const response = await fetch(`http://localhost:3000/formations/${formationId}`);
                const formation = await response.json();

                document.getElementById("modalTitle").innerText = formation.title;
                document.getElementById("modalBody").innerHTML = `
                    <img src="${formation.photo}" class="img-fluid mb-3" alt="${formation.title}">
                    <p><strong>Volume horaire:</strong> ${formation.volumeHoraire}</p>
                    <p><strong>Formateur:</strong> ${formation.formateur}</p>
                    <p>${formation.description}</p>
                `;
            });
        });

    } catch (error) {
        console.error("Erreur:", error);
        container.innerHTML = `<p class="text-danger">Impossible de charger les formations.</p>`;
    }
});
