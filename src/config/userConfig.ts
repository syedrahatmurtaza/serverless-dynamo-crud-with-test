import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "@schema/userSchema";
import { USERS_TABLE_NAME } from "src/constants/databaseConstants";

/******************************************************* User Functions Config ******************************************************/
export const createUserConfig = {
  handler: `src/functions/lambda/userHandler.createUserFunction`,
  events: [
    {
      http: {
        method: "post",
        path: "user/create",
        request: {
          schema: {
            "application/json": createUserSchema,
          },
        },
      },
    },
  ],
};

export const getAllUsersConfig = {
  handler: `src/functions/lambda/userHandler.getAllUsersFunction`,
  events: [
    {
      http: {
        method: "get",
        path: "user/getAll",
      },
    },
  ],
};

export const updateUserConfig = {
  handler: `src/functions/lambda/userHandler.updateUserFunction`,
  events: [
    {
      http: {
        method: "patch",
        path: "user/update",
        request: {
          schema: {
            "application/json": updateUserSchema,
          },
        },
      },
    },
  ],
};

export const deleteUserConfig = {
  handler: `src/functions/lambda/userHandler.deleteUserFunction`,
  events: [
    {
      http: {
        method: "delete",
        path: "user/delete",
        request: {
          schema: {
            "application/json": deleteUserSchema,
          },
        },
      },
    },
  ],
};

/******************************************************* User Table Config ******************************************************/
export const usersTableConfig = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: USERS_TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: "email",
        AttributeType: "S",
      },
    ],
    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};
