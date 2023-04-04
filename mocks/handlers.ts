import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    return res(ctx.status(403));
  }),
  rest.get("/user", (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: "Not authorized",
      })
    );
  }),
  rest.get("/sanctum/csrf-cookie", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
