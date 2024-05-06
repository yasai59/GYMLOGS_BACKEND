const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;
let exerciseCreated = {};

test("get all exercises", async () => {
  const response = await fetch(endPoint + "exercise");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get exercises by type", async () => {
  const response = await fetch(endPoint + "exercise/type/1");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("create exercise - good", async () => {
  const response = await fetch(endPoint + "exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercise_name: "test",
      link_video: "test",
      url_image: "test",
      fk_category_1: 1,
      fk_id_type: 1,
    }),
  });
  const data = await response.json();
  exerciseCreated = data;
  expect(response.status).toBe(201);
});

test("create exercise - bad (wrong type of content)", async () => {
  const response = await fetch(endPoint + "exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercise_name: "test",
      link_video: "test",
      url_image: "test",
      fk_category_1: 1,
      fk_id_type: "test",
    }),
  });
  const data = await response.json();
  expect(response.status).toBe(400);
});

test("create exercise - bad (missing field)", async () => {
  const response = await fetch(endPoint + "exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercise_name: "test",
      link_video: "test",
      url_image: "test",
      fk_category_1: 1,
    }),
  });
  const data = await response.json();
  expect(response.status).toBe(400);
});

test("update exercise - good", async () => {
  const response = await fetch(
    endPoint + "exercise/" + JSON.stringify(exerciseCreated.id),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise_name: "test",
        link_video: "test",
        url_image: "test",
        fk_category_1: 1,
        fk_id_type: 1,
      }),
    }
  );
  const data = await response.json();
  expect(response.status).toBe(201);
});

test("delete exercise - good", async () => {
  console.log("exerciseCreated.id", JSON.stringify(exerciseCreated.id));
  const response = await fetch(
    endPoint + "exercise/" + JSON.stringify(exerciseCreated.id),
    {
      method: "DELETE",
    }
  );

  const data = await response.json();
  expect(response.status).toBe(200);
});
