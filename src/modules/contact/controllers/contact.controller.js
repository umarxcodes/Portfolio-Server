// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { getClientMetadata } from "../../../shared/utils/request.utils.js";
import { CONTACT_MESSAGES } from "../constants/contact.constants.js";
import * as contactService from "../services/contact.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const submitContact = asyncHandler(async (req, res) => {
  const contact = await contactService.submitContact(
    req.body,
    getClientMetadata(req)
  );
  sendSuccess(res, 201, CONTACT_MESSAGES.CREATED, { contact });
});

const getContacts = asyncHandler(async (req, res) => {
  const result = await contactService.getContacts(req.query);
  sendSuccess(res, 200, CONTACT_MESSAGES.LISTED, result);
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  sendSuccess(res, 200, CONTACT_MESSAGES.FETCHED, { contact });
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await contactService.updateContactStatus(
    req.params.id,
    req.body
  );
  sendSuccess(res, 200, CONTACT_MESSAGES.UPDATED, { contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactService.deleteContact(req.params.id);
  sendSuccess(res, 200, CONTACT_MESSAGES.DELETED, { contact });
});

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
