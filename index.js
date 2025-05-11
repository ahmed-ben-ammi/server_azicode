const express = require('express');
const app = express();
const port = 3000;
const formations = require("./data/data.js")
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/formations/view', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'products.html'));
// });

app.get('/formations', (req, res) => {
  res.json(formations);
});

app.get('/formations/:id', (req, res) => {
    const formationId = parseInt(req.params.id);
    const formation = formations.find(item => item.id === formationId);
    
    if (!formation) {
      return res.status(404).send({message: 'formation nexsiste pas'});
    }else {
      res.json(formation);
    }
  });

app.get('/formateur/:id', (req, res) => {
 const formateurID = parseInt(req.params.id);
const formateur = formateurs.find(item=>item.id ===  formateurID)
if(!formateur){
  return res.status(404).send({message:"formateur nexest pas"})
}else{
  res.json(formateur);
}
});
app.get("/formateur",(req,res)=>{
  res.json(formateurs)
})
// app.get('/index', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get("/Formation1",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","formation1.html"))
})


app.listen(port, () => {
  console.log("Serveur lancé sur",port);
});
// DELETE LES FORMATION
app.delete('/formations/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const index = formations.findIndex(item => item.id === id); 

  if (index === -1) {
    
    return res.status(404).send({ message: 'Formation non trouvée' });
  }

  formations.splice(index, 1); 
  res.send({ message: 'Formation supprimée avec succès' });
});
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send("Bienvenue à Azicode62");
});


app.get('/formations', (req, res) => {
  res.json(formations);
});

app.get('/formations/:id', (req, res) => {
    const formationId = parseInt(req.params.id);
    const formation = formations.find(item => item.id === formationId);
    
    if (!formation) {
      return res.status(404).send({message: 'formation nexsiste pas'});
    }else {
      res.json(formation);
    }
  });







app.listen(port, () => {
  console.log("Serveur lancé sur",port);
});
// DELETE LES FORMATION
app.delete('/formations/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const index = formations.findIndex(item => item.id === id);

  if (index === -1) {
    
    return res.status(404).send({ message: 'Formation non trouvée' });
  }

  formations.splice(index, 1); 
  res.send({ message: 'Formation supprimée avec succès' });
});


