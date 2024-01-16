
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const action = options.action;
const id = options.id;
const name = options.name;
const email = options.email;
const phone = options.phone;

const result = await invokeAction(action, id, name, email, phone);

console.log(result);

async function invokeAction(action, id, name, email, phone) {
  switch (action) {
    case "list":
      return listContacts();
    case "get":
      return getContactById(id);
    case "add":
      return addContact(name, email, phone);
    case "remove":
      return removeContact(id);
    default:
      return null;
  }
}
