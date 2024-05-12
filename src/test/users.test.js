const { describe, expect, test, afterAll, beforeAll } = require("bun:test");
const endPoint = `${process.env.SERVER_HOST_HTTP}:${process.env.SERVER_PORT}/api/`;

let testUserId = 1;

const testUser = {
  username: "testuser",
  email: "testuser@gmail.com",
  pssd: "client",
  urole: 1,
  foto: null,
};

test("get users", async () => {
  const response = await fetch(endPoint + "users", {
    method: "GET",
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.length).toBeGreaterThan(0);
});

test("get users by id", async () => {
  const response = await fetch(endPoint + "users/" + testUserId);
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.length).toBeGreaterThan(0);
});

async function createUser() {

  const response = await fetch(endPoint + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: testUser.username,
      email: testUser.email,
      pssd: testUser.pssd,
      urole: testUser.urole,
      foto: testUser.foto,
    }),
  });
  const data = await response.json();
  return data;
}

let userData = {};

describe("user self configuration", () => {
  beforeAll(async () => {
    userData = await createUser();
  });

  test("login user - good", async () => {
    const response = await fetch(endPoint + "users/emailandpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: testUser.email,
        pssd: testUser.pssd,
      }),
    });
    expect(response.status).toBe(200);
  });

  test("login user - bad (don't exist)", async () => {
    const response = await fetch(endPoint + "users/emailandpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: testUser.email,
        pssd: "wrongpassword",
      }),
    });
    expect(response.status).toBe(404);
  });

  test("login user - bad (no user)", async () => {
    const response = await fetch(endPoint + "users/emailandpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "",
        pssd: "",
      }),
    });
    expect(response.status).toBe(404);
  });

  test("update email by id - bad", async () => {
    const response = await fetch(
      endPoint + "users/email/" + JSON.stringify(userData.id),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "testuserlol",
        }),
      }
    );
    expect(response.status).toBe(400);
  });

  const newEmail = "testuser1@gmail.com";
  test("update email by id - good", async () => {
    const response = await fetch(
      endPoint + "users/email/" + JSON.stringify(userData.id),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      }
    );
    expect(response.status).toBe(200);
  });

  test("update password by id - good", async () => {
    const response = await fetch(
      endPoint +
        "users/password/" +
        JSON.stringify(userData.id) +
        "/" +
        testUser.pssd,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pssd: "1323",
        }),
      }
    );
    expect(response.status).toBe(200);
  });

  test("update username by id - good", async () => {
    const response = await fetch(
      endPoint + "users/username/" + JSON.stringify(userData.id),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser1",
        }),
      }
    );
    expect(response.status).toBe(200);
  });

  test("delete user by id - good", async () => {
    // console.log("2- userdata id string:" + JSON.stringify(userData.pk_id_user));
    const response = await fetch(
      endPoint + "users/" + JSON.stringify(userData.id),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status).toBe(200);
  });
});
