const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFile = path.join(__dirname, '..', '..', 'public', 'data', 'products.json');

function readProducts() {
  try {
    const data = fs.readFileSync(productsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

router.get('/', (req, res) => {
  const products = readProducts();
  res.json(products);
});

router.get('/categories', (req, res) => {
  const products = readProducts();
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  res.json(categories);
});

router.get('/tags', (req, res) => {
  const products = readProducts();
  const tags = [...new Set(products.flatMap(p => p.tags || []))];
  res.json(tags);
});

router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  writeProducts(products);
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  writeProducts(products);
  res.json(deleted[0]);
});

module.exports = router;
