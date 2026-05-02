const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const aboutFile = path.join(__dirname, '..', '..', 'public', 'data', 'about.json');

function readAbout() {
  try {
    const data = fs.readFileSync(aboutFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      title: '关于我',
      introduction: '',
      description: '',
      skills: []
    };
  }
}

function writeAbout(about) {
  fs.writeFileSync(aboutFile, JSON.stringify(about, null, 2));
}

router.get('/', (req, res) => {
  const about = readAbout();
  res.json(about);
});

router.put('/', (req, res) => {
  const about = readAbout();
  const updatedAbout = {
    title: req.body.title || about.title,
    introduction: req.body.introduction || about.introduction,
    description: req.body.description || about.description,
    skills: req.body.skills || about.skills
  };
  writeAbout(updatedAbout);
  res.json(updatedAbout);
});

module.exports = router;
