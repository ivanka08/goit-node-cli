
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const contactsPath = join(process.cwd(), "contacts.json");

async function listContacts() {
  const contactsData = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsData);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  contacts.splice(contacts.indexOf(contact), 1);
  await writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactId = Math.max(...contacts.map((contact) => contact.id)) + 1;
  const contact = {
    id: contactId,
    name,
    email,
    phone,
  };
  contacts.push(contact);
  await writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return contact;
}

export { listContacts, getContactById, removeContact, addContact };
