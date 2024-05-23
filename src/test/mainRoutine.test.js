import { endPoint } from "./info.js";

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
