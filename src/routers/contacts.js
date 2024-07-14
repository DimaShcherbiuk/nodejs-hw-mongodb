import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllContacts, getContactById } from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:contactId', ctrlWrapper(getContactById));

export default contactsRouter;
