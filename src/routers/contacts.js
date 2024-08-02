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
import { auth } from '../middlewares/auth.js';

const contactsRouter = Router();

contactsRouter.get('/', auth, ctrlWrapper(getAllContacts));

contactsRouter.get('/:contactId', auth, isValidId, ctrlWrapper(getContactById));

contactsRouter.post(
  '/',
  auth,
  validateBody(createContactSchema),
  ctrlWrapper(addContact),
);

contactsRouter.delete(
  '/:contactId',
  auth,
  isValidId,
  ctrlWrapper(deleteContactById),
);

contactsRouter.patch(
  '/:contactId',
  auth,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactById),
);

export default contactsRouter;
