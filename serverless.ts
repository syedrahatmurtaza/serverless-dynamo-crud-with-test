import { esbuild } from "@config/esbuildConfig";

import {
  createUserConfig,
  deleteUserConfig,
  getAllUsersConfig,
  updateUserConfig,
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
        Action: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: "*",
      },
    ],
  },
  functions: {
    createUser: createUserConfig,
    getUsers: getAllUsersConfig,
    updateUser: updateUserConfig,
    deleteUser: deleteUserConfig,
  },
  resources: {
    Resources: {
      usersTable: usersTableConfig,
    },
  },
};

module.exports = serverlessConfiguration;
