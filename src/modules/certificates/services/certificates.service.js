import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import {
  CERTIFICATE_ERRORS,
  CERTIFICATE_FILTER_FIELDS,
  CERTIFICATE_SEARCH_FIELDS,
  CERTIFICATE_SORT_FIELDS,
} from "../constants/certificates.constants.js";
import * as certificatesRepository from "../repositories/certificates.repository.js";

const buildCertificateFilter = (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, CERTIFICATE_FILTER_FIELDS),
    ...buildSearch(queryParams.search, CERTIFICATE_SEARCH_FIELDS),
  };

  if (queryParams.skill) filter.skills = queryParams.skill;
  if (queryParams.expired === true) filter.expiryDate = { $lt: new Date() };
  if (queryParams.expired === false) {
    filter.$or = [{ expiryDate: null }, { expiryDate: { $gte: new Date() } }];
  }

  return filter;
};

const createCertificate = (data) => certificatesRepository.create(data);

const getCertificates = async (queryParams) => {
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, CERTIFICATE_SORT_FIELDS)
    : { issueDate: -1 };
  const result = await paginate(
    certificatesRepository.findAll(buildCertificateFilter(queryParams), sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getCertificateById = async (id) => {
  const certificate = await certificatesRepository.findById(id);
  if (!certificate) throw new AppError(404, CERTIFICATE_ERRORS.NOT_FOUND);
  return certificate;
};

const updateCertificate = async (id, data) => {
  const certificate = await certificatesRepository.updateById(id, data);
  if (!certificate) throw new AppError(404, CERTIFICATE_ERRORS.NOT_FOUND);
  return certificate;
};

const deleteCertificate = async (id) => {
  const certificate = await certificatesRepository.deleteById(id);
  if (!certificate) throw new AppError(404, CERTIFICATE_ERRORS.NOT_FOUND);
  return certificate;
};

export {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};
