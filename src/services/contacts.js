import { Contact } from '../db/models/Contact.js';

export const getAllContactsFromDB = () => Contact.find();

export const getContactByIdFormDB = (id) => Contact.findById(id);
