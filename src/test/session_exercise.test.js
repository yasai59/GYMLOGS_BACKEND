const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;
let exerciseCreated = {};

test("get all session - good", async () => {
  const response = await fetch(endPoint + "sessions_exercise/");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get session exercises by session id - good", async () => {
  const response = await fetch(endPoint + "sessions_exercise/" + 1);
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("post session exercise - good", async () => {
  const response = await fetch(endPoint + "sessions_exercise/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fk_id_exercise: 1,
      fk_id_sessio: 1,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("delete session exercise - good", async () => {
  const response = await fetch(
    endPoint + "sessions_exercise/" + JSON.stringify(exerciseCreated.pk_id_sessio_ex),
    {
      method: "DELETE",
    }
  );
  expect(response.status).toBe(200);
});
