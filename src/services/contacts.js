import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../db/models/Contact.js';
import { createPaginationInfo } from '../utils/createPaginationInfo.js';

export const getAllContactsFromDB = async (
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
) => {
  const skip = perPage * (page - 1);
  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId);
  const [count, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    Contact.find({ userId })
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

export const getContactByIdFormDB = (id, userId) =>
  Contact.findOne({ _id: id, userId });

export const createContact = (contactData) => Contact.create(contactData);

export const deleteContact = (id, userId) =>
  Contact.findOneAndDelete({ _id: id, userId });

export const updateContact = (id, userId, updateData) =>
  Contact.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
    runValidators: true,
  });
