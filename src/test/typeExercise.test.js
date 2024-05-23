import { endPoint } from "./info.js";

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
