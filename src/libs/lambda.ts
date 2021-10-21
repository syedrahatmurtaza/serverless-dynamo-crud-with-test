import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
// import validator from "@middy/validator";

// import { createUserSchema } from "@schema/userSchema";

// const inputSchema = {
//   type: "object",
//   properties: {
//     body: {
//       type: "object",
//       properties: {
//         id: { type: "number" },
//         firstName: { type: "string" },
//         email: { type: "string" },
//       },
//       required: ["id", "firstName", "email"],
//     },
//   },
// };

// const createUserSchema = {
//   type: "object",
//   properties: {
//     id: { type: "number" },
//     firstName: { type: "string" },
//     email: { type: "string" },
//   },
//   required: ["id", "firstName", "email"],
// } as any;

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};
