import { endPoint } from "./info.js";

test("get all categories", async () => {
  const response = await fetch(endPoint + "category");
  const data = await response.json();
  expect(response.status).toBe(200);
});

test("get category by id", async () => {
  const response = await fetch(endPoint + "category/1");
  const data = await response.json();
  expect(response.status).toBe(200);
});
