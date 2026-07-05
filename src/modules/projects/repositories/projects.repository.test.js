import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findByCategory, findFeatured } from "./projects.repository.js";

describe("projects repository", () => {
  it("returns composable Mongoose queries for paginated featured projects", () => {
    const query = findFeatured();

    assert.equal(typeof query.sort, "function");
    assert.equal(typeof query.skip, "function");
    assert.equal(typeof query.limit, "function");
  });

  it("returns composable Mongoose queries for category pages", () => {
    const query = findByCategory("backend");

    assert.equal(typeof query.sort, "function");
    assert.equal(typeof query.skip, "function");
    assert.equal(typeof query.limit, "function");
  });
});
