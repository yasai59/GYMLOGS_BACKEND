const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;

test("get all categories", async () => {
  const response = await fetch(endPoint + "category");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get category by id", async () => {
  const response = await fetch(endPoint + "category/1");
  const data = await response.json();
  expect(response.status).toBe(200);
});