import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoSanitize from "./mongoSanitize.middleware.js";

describe("mongoSanitize middleware", () => {
  it("does not depend on Express preserving this binding", () => {
    const req = {
      body: { $where: "ignored", safe: true },
      query: { "profile.name": "ignored", page: "1" },
      params: { id: "123" },
    };
    let nextCalled = false;

    const middleware = mongoSanitize.middleware;
    middleware(req, {}, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.deepEqual(req.body, { safe: true });
    assert.deepEqual(req.query, { page: "1" });
    assert.deepEqual(req.params, { id: "123" });
  });
});
