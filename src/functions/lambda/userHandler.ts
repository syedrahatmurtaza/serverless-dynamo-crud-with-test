// import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Callback, Context, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { USERS_TABLE_NAME } from "src/constants/databaseConstants";

// import { ICreateUserRequest } from "src/requests/user.request";
const documentClient = new AWS.DynamoDB.DocumentClient({});

/********************************* Create User Function ********************************/

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

/********************************* Get ALl Users Function ********************************/

const getAllUsers: Handler = async (
  event,
  context: Context,
  callback: Callback
) => {
  if (context && event) {
  }

  var result = await scanTable(USERS_TABLE_NAME);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Data Scanned Successfully",
      result: result,
    }),
  };

  callback(null, response);
};

export const scanTable = async (tableName) => {
  const params: any = {
    TableName: tableName,
  };

  let scanResults = [];
  let items;
  do {
    items = await documentClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");

  return scanResults;
};

export const getAllUsersFunction = middyfy(getAllUsers);

/********************************* Update User Function ********************************/

const updateUser: Handler = async (
  event,
  context: Context,
  callback: Callback
) => {
  if (context && event) {
  }

  const body = event.body;

  var params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      email: body.email,
    },
    UpdateExpression: "set id=:i, firstName=:n",
    ExpressionAttributeValues: {
      ":n": body.firstName,
      ":i": body.id,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    var result = await documentClient.update(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Updated Successfully",
        result: result,
      }),
    };

    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error",
        result: error,
      }),
    };

    callback(null, response);
  }
};

export const updateUserFunction = middyfy(updateUser);

/********************************* Delete User Function ********************************/

const deleteUser: Handler = async (
  event,
  context: Context,
  callback: Callback
) => {
  if (context && event) {
  }

  const body = event.body;

  var params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      email: body.email,
    },
  };

  try {
    var result = await documentClient.delete(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Deleted Successfully",
        result: result,
      }),
    };

    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error",
        result: error,
      }),
    };

    callback(null, response);
  }
};

export const deleteUserFunction = middyfy(deleteUser);
