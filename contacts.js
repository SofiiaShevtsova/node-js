const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(`./db/contacts.json`);

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");

    const listOfContacts = JSON.parse(list);
    console.table(listOfContacts);
    return listOfContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const listOfContacts = await listContacts();
    const contact = listOfContacts.find((elem) => elem.id === `${contactId}`);
    console.log(contact);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const listOfContacts = await listContacts();
    console.log(listOfContacts.find((elem) => elem.id === `${contactId}`));

    const newListOfContacts = listOfContacts.filter(
      (elem) => elem.id !== `${contactId}`
    );
    console.table(newListOfContacts);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newListOfContacts, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const listOfContacts = await listContacts();
    listOfContacts.push({
      name: name,
      email: email,
      phone: phone,
      id: nanoid(),
    });
    const newListOfContacts = listOfContacts;
    console.table(newListOfContacts)
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newListOfContacts, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};


