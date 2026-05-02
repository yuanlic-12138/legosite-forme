const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const projectsFile = path.join(__dirname, '..', '..', 'public', 'data', 'projects.json');

function readProjects() {
  try {
    const data = fs.readFileSync(projectsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeProjects(projects) {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

router.get('/', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

router.post('/', (req, res) => {
  const projects = readProjects();
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projects.push(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

router.put('/:id', (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projects[index] = {
    ...projects[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  writeProjects(projects);
  res.json(projects[index]);
});

router.delete('/:id', (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const deleted = projects.splice(index, 1);
  writeProjects(projects);
  res.json(deleted[0]);
});

router.get('/tags/all', (req, res) => {
  const projects = readProjects();
  const tags = [...new Set(projects.flatMap(p => p.tags || []))];
  res.json(tags);
});

module.exports = router;
