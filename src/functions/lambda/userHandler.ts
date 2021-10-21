// import { formatJSONResponse } from "@libs/apiGateway";
import { USERS_TABLE_NAME } from "@constants/databaseConstants";
import { middyfy } from "@libs/lambda";
import { Context, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

// import { ICreateUserRequest } from "src/requests/user.request";
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: "ap-southeast-1",
});

/********************************* Create User Function ********************************/

export const create = async (event, context) => {
  if (context) {
  }

  const body = event.body;

  const params = {
    TableName: USERS_TABLE_NAME,
    Item: {
      ...body,
    },
    ReturnValues: "ALL_OLD",
  };

  var result = {};
  if (result) {
  }

  try {
    result = documentClient.put(params, function (error, result) {
      if (error) {
      }
      return result;
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Inserted Successfully",
        // result,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Inserted Successfully",
        // result,
      }),
    };

    return response;
  }
};

export const createUserFunction = middyfy(create);

/********************************* Get ALl Users Function ********************************/

const getAllUsers: Handler = async (event, context) => {
  if (event && context) {
  }

  var result: any = {};

  try {
    result = await scanTable(USERS_TABLE_NAME);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Scanned Successfully",
        result: result,
      }),
    };

    return new Promise((resolve) => resolve(response));
  } catch (error) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error Scanning Data",
        result: error,
      }),
    };

    return new Promise((resolve) => resolve(response));
  }
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
// export const getAllUsersFunction = getAllUsers;

/********************************* Update User Function ********************************/

const updateUser = async (event, context: Context) => {
  if (context && event) {
  }

  const body = JSON.parse(event.body);

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

  var response: any = {};

  var result: any = {};

  documentClient.update(params, (error, data) => {
    if (error) {
    }

    result = data;
  });

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Data Updated Successfully",
      result: result,
    }),
  };

  return response;
};

export const updateUserFunction = middyfy(updateUser);

/********************************* Delete User Function ********************************/

const deleteUser: Handler = async (event, context: Context) => {
  if (context && event) {
  }

  const body = event.body;

  var params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      email: body.email,
    },
  };

  var response: any = {};

  try {
    var result: any = {};
    documentClient.delete(params, (error, data) => {
      if (error) {
      }

      result = data;
    });

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data Deleted Successfully",
        result: result,
      }),
    };

    return response;
  } catch (error) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error",
        result: error,
      }),
    };

    return response;
  }
};

export const deleteUserFunction = middyfy(deleteUser);
