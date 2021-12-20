import 'source-map-support/register';
import { StatusCodes } from 'http-status-codes';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const { email, password } = event.body;

  if (!email) {
    const response = formatJSONResponse({
      message: 'You should provide an email to create user',
      event,
    });
    response.statusCode = StatusCodes.BAD_REQUEST;
    return response;
  }

  if (!password) {
    const response = formatJSONResponse({
      message: 'You should provide a password to create user',
      event,
    });
    response.statusCode = StatusCodes.BAD_REQUEST;
    return response;
  }

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(createUser);
