import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactById));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(addContact),
);

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactById));

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactById),
);

export default contactsRouter;
