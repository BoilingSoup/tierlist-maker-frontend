import { rest } from "msw";
import { User } from "../contexts/AuthProvider";

const mockUser: User = {
  username: "bobby",
  id: "1234-5678",
  is_admin: false,
  email: "bobby@bobby.com",
  email_verified: false,
  oauth_provider: null,
};

export const handlers = [
  rest.post("/login", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json<User>(mockUser));
  }),
  rest.get("/v1/user", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json<User>(mockUser));
  }),
  rest.get("/sanctum/csrf-cookie", (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
