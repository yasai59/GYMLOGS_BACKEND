import { endPoint } from "./info.js";
let exerciseCreated = {};

test("get calendar by session - good", async () => {
  const response = await fetch(endPoint + "calendar/" + 1);
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("post calendar - good", async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, "0");

  const response = await fetch(endPoint + "calendar/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serie: 1,
      weight: 1,
      repetitions: 1,
      duration: 1,
      day: `${year}-${month}-${day}`,
      fk_id_session_ex: 1,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("delete calendar - good", async () => {
  const response = await fetch(
    endPoint + "calendar/" + JSON.stringify(exerciseCreated.pk_id_calendar),
    {
      method: "DELETE",
    }
  );
  expect(response.status).toBe(200);
});
