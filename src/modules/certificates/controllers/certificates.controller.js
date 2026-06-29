import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { CERTIFICATE_MESSAGES } from "../constants/certificates.constants.js";
import * as certificatesService from "../services/certificates.service.js";

const createCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificatesService.createCertificate(req.body);
  sendSuccess(res, 201, CERTIFICATE_MESSAGES.CREATED, { certificate });
});

const getCertificates = asyncHandler(async (req, res) => {
  const result = await certificatesService.getCertificates(req.query);
  sendSuccess(res, 200, CERTIFICATE_MESSAGES.LISTED, result);
});

const getCertificateById = asyncHandler(async (req, res) => {
  const certificate = await certificatesService.getCertificateById(
    req.params.id
  );
  sendSuccess(res, 200, CERTIFICATE_MESSAGES.FETCHED, { certificate });
});

const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificatesService.updateCertificate(
    req.params.id,
    req.body
  );
  sendSuccess(res, 200, CERTIFICATE_MESSAGES.UPDATED, { certificate });
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificatesService.deleteCertificate(
    req.params.id
  );
  sendSuccess(res, 200, CERTIFICATE_MESSAGES.DELETED, { certificate });
});

export {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};
