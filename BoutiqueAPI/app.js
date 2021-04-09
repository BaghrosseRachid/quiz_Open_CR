const express = require('express');
const app =express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Product = require('./modules/Product');



//data base connect
mongoose.connect('mongodb+srv://rachid_baghrosse:toufik98@cluster0.ttgx8.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// let the servers change requests // applicable sur tous les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  //get all products
  app.get('/api/products', (req, res, next) => {
       Product.find()
      .then(products => res.status(200).json({products}))
      .catch(error => res.status(404).json({ error }))
  })
  //get product by id

  app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json({product}))
      .catch(error => res.status(404).json({ error }));
  });

  // //post to add product
  app.post('/api/products', (req, res, next) => {
    console.log(req.body)
  const product = new Product({
      ...req.body
    });
    product.save()
      .then(product => res.status(201).json({product}))
      .catch(error => res.status(400).json({ error }))
      
  });

  //update product

  app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id },{...req.body, _id: req.params.id })
      .then(() => res.status(200).json({message : 'objet modifié'}))
      .catch(error => res.status(404).json({ error }));
  });

  //delete one 
  app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  module.exports=app