export const createUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    firstName: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "firstName", "email"],
} as const;

export const getAllUsersSchema = {
  type: "object",
  properties: {},
  required: [],
} as const;

export const updateUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    firstName: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "firstName", "email"],
} as const;

export const deleteUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
} as const;
