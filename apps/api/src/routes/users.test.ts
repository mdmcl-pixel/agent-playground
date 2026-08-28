import assert from "node:assert/strict";
import test from "node:test";

import type { Request, Response } from "express";

import router from "./users";

type CapturedResponse = {
  statusCode: number;
  body: unknown;
};

function getRouteHandler(method: "get" | "post") {
  const layer = router.stack.find(
    (entry) => entry.route?.path === "/" && entry.route.methods[method]
  );

  assert.ok(layer?.route, `${method.toUpperCase()} / route should exist`);
  return layer.route.stack[0].handle;
}

function createResponse(): { res: Response; captured: CapturedResponse } {
  const captured: CapturedResponse = {
    statusCode: 200,
    body: undefined
  };

  const res = {
    status(code: number) {
      captured.statusCode = code;
      return this;
    },
    json(body: unknown) {
      captured.body = body;
      return this;
    }
  } as Response;

  return { res, captured };
}

test("GET / returns the user list stub response", () => {
  const handler = getRouteHandler("get");
  const { res, captured } = createResponse();

  handler({} as Request, res, () => undefined);

  assert.equal(captured.statusCode, 200);
  assert.deepEqual(captured.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST / returns the user creation stub response", () => {
  const handler = getRouteHandler("post");
  const { res, captured } = createResponse();
  const req = {
    body: {
      email: "user@example.com",
      name: "Example User"
    }
  } as Request;

  handler(req, res, () => undefined);

  assert.equal(captured.statusCode, 201);
  assert.deepEqual(captured.body, {
    data: {
      id: "stub-user-id",
      email: "user@example.com",
      name: "Example User"
    },
    message: "User creation is not implemented yet."
  });
});
