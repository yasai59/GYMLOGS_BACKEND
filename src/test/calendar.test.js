const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;
let exerciseCreated = {};

test("get calendar by session - good", async () => {
  const response = await fetch(endPoint + "calendar/" + 1);
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("post calendar - good", async () => {
  const response = await fetch(endPoint + "calendar/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      datas: "1kg",
      duration: 60,
      fk_id_session: 1,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("delete calendar - good", async () => {
  const response = await fetch(
    endPoint + "calendar/" + JSON.stringify(exerciseCreated.id),
    {
      method: "DELETE",
    }
  );
  expect(response.status).toBe(200);
});