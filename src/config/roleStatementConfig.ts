export const dynamoDBRoleStatement = {
  Effect: "Allow",
  Action: ["dynamodb:PutItem", "dynamodb:Scan"],
  Resource: "*",
};
