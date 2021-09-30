const { program } = require('commander');
const contactsOperations = require('./contacts');

program
  .option('-a, --action <type>', 'choose action') 
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactById = await contactsOperations.getContactById(id);
      if(!contactById) {
        console.log(`Контакт з id='${id}' не знайдений`)
        break;
      }
      console.log(contactById);
      break;

    case 'add':
      if(!name || !email || !phone) {
        console.log(`Для додавання контакту потрібно вказати значення: 'name', 'email', 'phone'`);
        break;
      };

      const addContact = await contactsOperations.addContact(name, email, phone);
      console.log(addContact);
      break;

    case 'remove':
      const removeContactById = await contactsOperations.removeContact(id);
      if(!removeContactById) {
        console.log(`Не вдалось видалити контакт, оскільки контакт з id='${id}' не знайдений`)
        break;
      }
      console.log(removeContactById);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  };
};

invokeAction(options);