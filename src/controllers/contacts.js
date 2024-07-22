import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContactsFromDB,
  getContactByIdFormDB,
  updateContact,
} from '../services/contacts.js';

export async function getAllContacts(req, res) {
  const contacts = await getAllContactsFromDB();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContactByIdFormDB(contactId);
  if (!contact) {
    createHttpError(404, 'Contact not found');
  } else {
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  }
}

export async function addContact(req, res) {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: contact,
  });
}

export async function changeContact(req, res) {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, { upsert: true });
  if (!contact) {
    createHttpError(404, 'Contact not found');
  } else {
    res.json({
      status: 200,
      message: `Successfully patched a student!`,
      data: contact,
    });
  }
}

export async function deleteContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Student not found'));
    return;
  } else {
    res.sendStatus(204);
  }
}
