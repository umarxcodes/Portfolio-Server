import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import {
  CONTACT_ERRORS,
  CONTACT_SORT_FIELDS,
} from "../constants/contact.constants.js";
import * as contactRepository from "../repositories/contact.repository.js";
import { trackContactSubmission } from "../../analytics/services/analytics.service.js";

const submitContact = async (data, metadata) => {
  const contact = await contactRepository.create(data);
  await trackContactSubmission(metadata);
  return contact;
};

const getContacts = async (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, ["status", "isRead"]),
    ...buildSearch(queryParams.search, ["name", "email", "subject"]),
  };
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, CONTACT_SORT_FIELDS)
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

export {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
