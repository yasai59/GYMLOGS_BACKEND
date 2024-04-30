const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;

test("get typeExercises", async () => {
  const response = await fetch(endPoint + "typeExercise");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get typeExercises by id", async () => {
  const response = await fetch(endPoint + "typeExercise/1");
  const data = await response.json();
  expect(response.status).toBe(200);
});
