import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:contactId', ctrlWrapper(getContactById));

contactsRouter.post('/', ctrlWrapper(addContact));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactById));

contactsRouter.patch('/:contactId', ctrlWrapper(updateContactById));

export default contactsRouter;
