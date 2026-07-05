import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { z } from "zod";
import { sanitizePayload, validate } from "./validation.utils.js";

describe("validation utils", () => {
  it("removes Mongo operator and dotted keys recursively", () => {
    const payload = sanitizePayload({
      name: "Ada",
      $ne: "ignored",
      "profile.title": "ignored",
      nested: {
        ok: true,
        $gt: 1,
      },
    });

    assert.deepEqual(payload, {
      name: "Ada",
      nested: { ok: true },
    });
  });

  it("writes parsed Zod transforms back to the request source", () => {
    const req = {
      body: {
        email: "ADMIN@EXAMPLE.COM",
        name: "  Admin  ",
      },
    };
    const schema = z.object({
      email: z.string().email().toLowerCase(),
      name: z.string().trim(),
    });

    validate(schema)(req, {}, () => {});

    assert.deepEqual(req.body, {
      email: "admin@example.com",
      name: "Admin",
    });
  });

  it("throws AppError-shaped validation failures", () => {
    const req = { query: { page: "bad" } };
    const schema = z.object({ page: z.coerce.number().int().positive() });

    assert.throws(() => validate(schema, "query")(req, {}, () => {}), {
      name: "AppError",
      statusCode: 400,
      message: "Validation failed",
    });
  });
});
