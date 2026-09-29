const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produits = [
    {id: 1, nom:'test',description:'test',prix:10,catégorie:'avion'},
    {id: 2, nom:'test2',description:'test2',prix:20,catégorie:'voiture'},
    {id: 3, nom:'test3',description:'test3',prix:30,catégorie:'bateau'},
    {id: 4, nom:'test4',description:'test4',prix:40,catégorie:'moto'},
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

app.post('/api/produits', (req, res) => {
    const { nom, description, prix, catégorie } = req.body;
    if (!nom || !description || !prix || !catégorie) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    const nouveauProduit = {
        id: produits.length > 0 ? produits[produits.length - 1].id + 1 : 1,
        nom,
        description,
        prix,
        catégorie
    };
    produits.push(nouveauProduit);
    res.status(201).json(nouveauProduit);
});

app.put('/api/produits/:id', (req, res) => {
    const produitId = parseInt(req.params.id);
    const { nom, description, prix, catégorie } = req.body;
    let produit = produits.find(p => p.id === produitId);
    if (!produit) {
        return res.status(404).json({ message: 'Produit introuvable' });
    }
    produit.nom = nom || produit.nom;
    produit.description = description || produit.description;
    produit.prix = prix || produit.prix;
    produit.catégorie = catégorie || produit.catégorie;
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