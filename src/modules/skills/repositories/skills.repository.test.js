import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findByCategory } from "./skills.repository.js";

describe("skills repository", () => {
  it("returns a composable Mongoose query for category pages", () => {
    const query = findByCategory("backend");

    assert.equal(typeof query.sort, "function");
    assert.equal(typeof query.skip, "function");
    assert.equal(typeof query.limit, "function");
  });
});
