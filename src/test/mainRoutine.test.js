const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;
let exerciseCreated = {};

test("post mainRoutine - good", async () => {
  const response = await fetch(endPoint + "mainRoutine/" + 2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fk_id_user: 3,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});
