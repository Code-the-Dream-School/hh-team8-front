import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8000/api/v1/", (req, res, ctx) => {
    return res(ctx.json({ data: "This is a full stack app!" }));
  }),
];
