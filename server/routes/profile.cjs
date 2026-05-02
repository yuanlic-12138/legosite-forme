const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const profileFile = path.join(__dirname, '..', '..', 'public', 'data', 'profile.json');

function readProfile() {
  try {
    const data = fs.readFileSync(profileFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      progress: { percentage: 0, label: '人生进度' },
      activities: []
    };
  }
}

function writeProfile(profile) {
  fs.writeFileSync(profileFile, JSON.stringify(profile, null, 2));
}

router.get('/', (req, res) => {
  const profile = readProfile();
  res.json(profile);
});

router.put('/', (req, res) => {
  const profile = readProfile();
  const updatedProfile = {
    progress: req.body.progress || profile.progress,
    activities: req.body.activities || profile.activities
  };
  writeProfile(updatedProfile);
  res.json(updatedProfile);
});

router.put('/progress', (req, res) => {
  const profile = readProfile();
  profile.progress = {
    percentage: req.body.percentage ?? profile.progress.percentage,
    label: req.body.label || profile.progress.label
  };
  writeProfile(profile);
  res.json(profile.progress);
});

router.put('/activities', (req, res) => {
  const profile = readProfile();
  profile.activities = req.body.activities || profile.activities;
  writeProfile(profile);
  res.json(profile.activities);
});

module.exports = router;
