const fs = require('fs').promises;
const path = require('path');
const {v4: uuid} = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(contactsList)
  return contacts;
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex( contact => contact.id.toString() === contactId);
  
  if(contactIndex === -1) {
    return null;
  };
 
  return contacts[contactIndex];
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {name, email, phone, id: uuid()};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex( contact => contact.id.toString() === contactId);
  
  if(contactIndex === -1) {
    return null;
  };
  contacts.splice(contactIndex, 1);
 
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return true;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};