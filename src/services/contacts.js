import { Contact } from '../db/models/Contact.js';
import { createPaginationInfo } from '../utils/createPaginationInfo.js';

export const getAllContactsFromDB = async (
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
) => {
  const skip = perPage * (page - 1);
  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId);

  const [count, data] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    Contact.find()
      .merge(contactsQuery)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortOrder]: sortBy })
      .exec(),
  ]);
  const paginationInfo = createPaginationInfo(page, perPage, count);
  return {
    data,
    ...paginationInfo,
  };
};

export const getContactByIdFormDB = (id) => Contact.findById(id);

export const createContact = (contactData) => Contact.create(contactData);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const updateContact = (id, updateData) =>
  Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
