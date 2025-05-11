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
