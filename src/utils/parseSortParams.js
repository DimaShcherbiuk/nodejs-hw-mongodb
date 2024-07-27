// import { SORT_ORDER } from '../constants/index.js';

// const parseSortOrder = (sortOrder) => {
//   const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
//   if (isKnownOrder) return sortOrder;
//   return SORT_ORDER.ASC;
// };

// const parseSortBy = (sortBy) => {
//   const keysOfContact = [
//     '_id',
//     'name',
//     'phoneNumber',
//     'email',
//     'isFavourite',
//     'contactType',
//     'createdAt',
//     'updatedAt',
//   ];

//   if (keysOfContact.includes(sortBy)) {
//     return sortBy;
//   }

//   return '_id';
// };

// export const parseSortParams = (query) => {
//   const { sortOrder, sortBy } = query;

//   const parsedSortOrder = parseSortOrder(sortOrder);
//   const parsedSortBy = parseSortBy(sortBy);
//   console.log({ sortOrder, sortBy });
//   return {
//     sortOrder: parsedSortOrder,
//     sortBy: parsedSortBy,
//   };
// };

import { SORT_ORDER } from '../constants/index.js';

function parseSortBy(sortBy) {
  const keys = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  if (keys.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
}

function parseSortOrder(sortOrder) {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
}

function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}

export { parseSortParams };
