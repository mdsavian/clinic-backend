/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { hello, createUser } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'serverless-boilerplate',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'yarn',
    },
    stages: ['staging', 'production'],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: true, // active to see CacheHits and Misses
    },
    logs: {
      restApi: {
        accessLogging: false,
        executionLogging: false,
        level: 'INFO',
        fullExecutionData: false,
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      USER_POOL_CLIENT_ID: '${env:INTEGRATION_API_URL}',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { hello, createUser },
};

module.exports = serverlessConfiguration;
