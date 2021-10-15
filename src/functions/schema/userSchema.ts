export const createUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "name", "email"],
} as const;

export const getAllUsersSchema = {
  type: "object",
  properties: {},
  required: [],
} as const;
