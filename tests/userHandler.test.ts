import { APIGatewayEvent } from "aws-lambda";

/********************************************** Create User **********************************************/
import { createUserFunction } from "../src/functions/lambda/userHandler";
import { ICreateUserRequest } from "../src/requests/user.request";

test("Testing Create User Function", async () => {
  //
  const body: ICreateUserRequest = {
    id: 10,
    firstName: "Syed Rahat Murtaza Bukhari",
    email: "murtaza@yahoo.com",
  };
  const request: APIGatewayEvent = {
    body: JSON.stringify(body),
  } as any;
  let result: any = {};

  await createUserFunction(request, {} as any, function (error, data) {
    if (error) {
    }

    result = data;
  });

  expect(result.statusCode).toBe(200);
  expect(result.body).toContain("Data Inserted Successfully");
});

/********************************************** Get All Users **********************************************/
import { getAllUsersFunction } from "../src/functions/lambda/userHandler";

test("Testing Get All Users Function", async () => {
  const body: ICreateUserRequest = {
    id: 10,
    firstName: "Syed Rahat Murtaza Bukhari",
    email: "murtaza@yahoo.com",
  };
  const request: APIGatewayEvent = {
    body: JSON.stringify(body),
  } as any;
  let result: any = {};

  await getAllUsersFunction(request, {} as any, function (error, data) {
    if (error) {
    }

    result = data;
  });

  expect(result.statusCode).toBe(200);
  expect(result.body).toContain("Data Scanned Successfully");
});

/********************************************** Update User **********************************************/
import { updateUserFunction } from "../src/functions/lambda/userHandler";

test("Testing Update User Function", async () => {
  const body: ICreateUserRequest = {
    id: 10,
    firstName: "Wow111",
    email: "murtaza@yahoo.com",
  };

  const request: APIGatewayEvent = {
    body: JSON.stringify(body),
  } as any;

  let result: any = {};

  await updateUserFunction(request, {} as any, (error, data) => {
    if (error) {
    }
    result = data;
  });

  expect(result.statusCode).toBe(200);
  expect(result.body).toContain("Data Updated Successfully");
});

/********************************************** Delete User **********************************************/
import { deleteUserFunction } from "../src/functions/lambda/userHandler";

test("Testing Delete User Function", async () => {
  const body = {
    email: "murtaza@yahoo.com",
  };

  const request: APIGatewayEvent = {
    body: JSON.stringify(body),
  } as any;

  let result: any = {};

  await deleteUserFunction(request, {} as any, (error, data) => {
    if (error) {
    }
    console.log(data);
    result = data;
  });

  expect(result.statusCode).toBe(200);
  expect(result.body).toContain("Data Deleted Successfully");
});