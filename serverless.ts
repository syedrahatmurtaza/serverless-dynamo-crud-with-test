import { esbuild } from "@config/esbuildConfig";
// import { dynamoDBRoleStatement } from "@config/roleStatementConfig";
import {
  createUserConfig,
  getAllUsersConfig,
  usersTableConfig,
} from "@config/userConfig";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "serverless-dynamodb-cloud-crud",
  frameworkVersion: "2",
  custom: {
    esbuild,
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-southeast-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem"],
        Resource: "*",
      },
    ],
  },
  functions: { createUser: createUserConfig, getUsers: getAllUsersConfig },
  resources: {
    Resources: {
      usersTable: usersTableConfig,
    },
  },
};

module.exports = serverlessConfiguration;
