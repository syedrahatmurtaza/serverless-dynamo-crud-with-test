// import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Callback, Context, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { USERS_TABLE_NAME } from "src/constants/databaseConstants";

// import { ICreateUserRequest } from "src/requests/user.request";
const documentClient = new AWS.DynamoDB.DocumentClient({});

const create: Handler = async (event, context: Context, callback: Callback) => {
  if (context) {
  }

  const body = JSON.parse(event.body);

  const params = {
    TableName: USERS_TABLE_NAME,
    Item: {
      ...body,
    },
    ReturnValues: "ALL_OLD",
  };

  var result = {};

  documentClient.put(params, function (error, data) {
    if (error) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Error Creating User",
          result: error,
        }),
      };

      callback(null, response);
    }

    result = data;
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Data Inserted Successfully",
      result: result,
    }),
  };

  callback(null, response);
};

export const createUserFunction = middyfy(create);

const getAllUsers: Handler = async (
  event,
  context: Context,
  callback: Callback
) => {
  if (context && event) {
  }

  const params = {
    TableName: USERS_TABLE_NAME,
  };

  var result = {};

  documentClient.scan(params, function (error, data) {
    if (error) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Error Getting Users",
          result: error,
        }),
      };

      callback(null, response);
    }

    result = data;
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Data Scanned Successfully",
      result: result,
    }),
  };

  callback(null, response);
};

export const getAllUsersFunction = middyfy(getAllUsers);
