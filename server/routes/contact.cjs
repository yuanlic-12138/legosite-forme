const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const contactFile = path.join(__dirname, '..', '..', 'public', 'data', 'contact.json');

function readContact() {
  try {
    const data = fs.readFileSync(contactFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      title: '联系我',
      description: '有任何问题或想法？欢迎联系我！',
      contacts: []
    };
  }
}

function writeContact(contact) {
  fs.writeFileSync(contactFile, JSON.stringify(contact, null, 2));
}

router.get('/', (req, res) => {
  const contact = readContact();
  res.json(contact);
});

router.put('/', (req, res) => {
  const contact = readContact();
  const updatedContact = {
    title: req.body.title || contact.title,
    description: req.body.description || contact.description,
    contacts: req.body.contacts || contact.contacts
  };
  writeContact(updatedContact);
  res.json(updatedContact);
});

module.exports = router;
