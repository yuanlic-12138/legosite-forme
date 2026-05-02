const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uploadRouter = require('./routes/upload.cjs');
const projectsRouter = require('./routes/projects.cjs');
const productsRouter = require('./routes/products.cjs');
const profileRouter = require('./routes/profile.cjs');
const contactRouter = require('./routes/contact.cjs');
const aboutRouter = require('./routes/about.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/upload', uploadRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/products', productsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/contact', contactRouter);
app.use('/api/about', aboutRouter);

const dataDir = path.join(__dirname, '..', 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const projectsFile = path.join(dataDir, 'projects.json');
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify([], null, 2));
}

const productsFile = path.join(dataDir, 'products.json');
if (!fs.existsSync(productsFile)) {
  fs.writeFileSync(productsFile, JSON.stringify([], null, 2));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
