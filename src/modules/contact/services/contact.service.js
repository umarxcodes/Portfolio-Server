// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import { CONTACT_ERRORS } from "../constants/contact.constants.js";
import * as contactRepository from "../repositories/contact.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const submitContact = (data) => contactRepository.create(data);

const getContacts = async (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, ["status", "isRead"]),
    ...buildSearch(queryParams.search, ["name", "email", "subject"]),
  };
  const sort = queryParams.sort
    ? buildSort(queryParams.sort)
    : { createdAt: -1 };
  const result = await paginate(
    contactRepository.findAll(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getContactById = async (id) => {
  const contact = await contactRepository.updateById(id, {
    isRead: true,
    status: "read",
  });
  if (!contact) throw new AppError(404, CONTACT_ERRORS.NOT_FOUND);
  return contact;
};

const updateContactStatus = async (id, data) => {
  const update = {
    status: data.status,
    isRead: data.status !== "unread",
    repliedAt: data.status === "replied" ? new Date() : null,
  };
  const contact = await contactRepository.updateById(id, update);
  if (!contact) throw new AppError(404, CONTACT_ERRORS.NOT_FOUND);
  return contact;
};

const deleteContact = async (id) => {
  const contact = await contactRepository.deleteById(id);
  if (!contact) throw new AppError(404, CONTACT_ERRORS.NOT_FOUND);
  return contact;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
