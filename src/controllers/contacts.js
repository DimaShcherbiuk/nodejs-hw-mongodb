import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContactsFromDB,
  getContactByIdFormDB,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getAllContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContactsFromDB(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  );
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactByIdFormDB(contactId);
  if (
    contact === null ||
    contact.userId.toString() !== req.user._id.toString()
  ) {
    return next(createHttpError(404, 'Student not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

export async function addContact(req, res) {
  const contact = await createContact({ ...req.body, userId: req.user._id });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function updateContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact,
  });
}

export async function deleteContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
}
