const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;
let exerciseCreated = {};

test("get routines by user - good", async () => {
  const response = await fetch(endPoint + "routine/" + 1);
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("post routine - good", async () => {
  const response = await fetch(endPoint + "routine/" + 1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routine_name: "test",
      type_routine: "libre",
      day_routine: null,
      num_routine: null,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("update routine name - good", async () => {
  const response = await fetch(
    endPoint + "routine/name/" + JSON.stringify(exerciseCreated.id),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routine_name: "test2",
      }),
    }
  );
  const data = await response.json();
  expect(response.status).toBe(200);
}); 

test("update routine days - good", async () => {
  const response = await fetch(
    endPoint + "routine/day/" + JSON.stringify(exerciseCreated.id),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day_routine: "L, M, X",
        num_routine: 0
      }),
    }
  );
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("delete routine - good", async () => {
  const response = await fetch(
    endPoint + "routine/" + JSON.stringify(exerciseCreated.id),
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  expect(response.status).toBe(200);
});
