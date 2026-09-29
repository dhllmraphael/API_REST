const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produits = [
    {id: 1, nom:'test',description:'test',prix:10,categorie:'avion'},
    {id: 2, nom:'test2',description:'test2',prix:20,categorie:'voiture'},
    {id: 3, nom:'test3',description:'test3',prix:30,categorie:'bateau'},
    {id: 4, nom:'test4',description:'test4',prix:40,categorie:'moto'},
];

app.get('/api/produits', (req, res) => {
    res.status(200).json(produits);
});

app.get('/api/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const produit = produits.find(p => p.id === produitId);
    if (!produit) {
        return res.status(404).json({ message: 'Produit introuvable' });
    }
    res.status(200).json(produit);
});

app.post('/api/produits/add', (req, res) => {
    const { nom, description, prix, categorie } = req.body;
    const nouveauProduit = {
        id: produits.length > 0 ? produits[produits.length - 1].id + 1 : 1,
        nom,
        description,
        prix,
        categorie
    };
    produits.push(nouveauProduit);
    res.status(201).json(nouveauProduit);
});

app.put('/api/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const { nom, description, prix, categorie } = req.body;
    let produit = produits.find(p => p.id === produitId);
    if (!produit) {
        return res.status(404).json({ message: 'Produit introuvable' });
    }
    produit.nom = nom || produit.nom;
    produit.description = description || produit.description;
    produit.prix = prix || produit.prix;
    produit.categorie = categorie || produit.categorie;
    res.status(200).json(produit);
});

app.delete('/api/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const index = produits.findIndex(p => p.id === produitId);
    if (index === -1) {
        return res.status(404).json({ message: 'Produit introuvable' });
    }
    produits.splice(index, 1);
    res.status(200).json({ message: 'Produit supprimé avec succès' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});