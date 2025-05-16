const express = require('express');
const app = express();
const port = 3000;
const formations = require("./data/data.js"); // Vérifie que le fichier existe
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //  Middleware JSON pour traiter les requêtes POST

// Route principale
app.get('/', (req, res) => {
  res.send("Bienvenue à Azicode62");
});

// Affichage des formations
app.get('/formations', (req, res) => {
  res.json(formations);
});

// Affichage d'une formation spécifique (voir plus)
app.get('/formations/:id', (req, res) => {
  const formationId = parseInt(req.params.id);
  const formation = formations.find(item => item.id === formationId);
  
  if (!formation) {
    return res.status(404).json({ message: 'Formation inexistante' });
  }
  
  res.json(formation);
});
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/Formation1",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","formation1.html"))
})

// Page d'ajout de formation
app.get('/novelleformation', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "novelleformation.html"));
});

// Ajout d'une nouvelle formation (POST)
app.post('/novelleformation', (req, res) => {
  console.log(req.body); //  Correction ici

  const { nomFormation, volumeHoraire, description, formateur,  photo} = req.body;

  if (!nomFormation || !volumeHoraire || !description || !formateur) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const nouvelleFormation = {
    id: formations.length + 1,
    title: nomFormation,
    volumeHoraire,
    formateur,
    photo,
    description
  };

  formations.push(nouvelleFormation);
  
  res.status(201).json(nouvelleFormation);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(` Serveur lancé sur http://localhost:${port}`);
});















