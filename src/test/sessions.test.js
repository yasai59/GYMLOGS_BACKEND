import { endPoint } from "./info.js";

let exerciseCreated = {};

test("get sessions by routine - good", async () => {
  const response = await fetch(endPoint + "sessions/" + 1);
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get category of the session - good", async () => {
  const response = await fetch(endPoint + "sessions/category/" + 1);
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(200);
});

test("post session - good", async () => {
  const response = await fetch(endPoint + "sessions/" + 1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nom_session: "test",
      week_day: "Lunes",
      fk_category_1: 1,
      fk_category_2: 2,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("update session name - good", async () => {
  const response = await fetch(
    endPoint + "sessions/name/" + JSON.stringify(exerciseCreated.pk_id_sessio),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom_session: "test2",
      }),
    }
  );
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("delete session - good", async () => {
  const response = await fetch(
    endPoint + "sessions/" + JSON.stringify(exerciseCreated.pk_id_sessio),
    {
      method: "DELETE",
    }
  );
  expect(response.status).toBe(200);
});
