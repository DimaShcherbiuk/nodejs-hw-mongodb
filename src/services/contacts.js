import { Contact } from '../db/models/Contact.js';

export const getAllContactsFromDB = () => Contact.find();

export const getContactByIdFormDB = (id) => Contact.findById(id);

export const createContact = (contactData) => Contact.create(contactData);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const updateContact = (id, updateData) =>
  Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
