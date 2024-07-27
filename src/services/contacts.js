import { Contact } from '../db/models/Contact.js';
import { createPaginationInfo } from '../utils/createPaginationInfo.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContactsFromDB = async (
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
) => {
  const skip = perPage * (page - 1);
  const contactsQuery = Contact.find();

  const [count, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    Contact.find()
      .merge(contactsQuery)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationInfo = createPaginationInfo(page, perPage, count);
  return {
    contacts,
    ...paginationInfo,
  };
};

export const getContactByIdFormDB = (id) => Contact.findById(id);

export const createContact = (contactData) => Contact.create(contactData);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const updateContact = (id, updateData) =>
  Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
