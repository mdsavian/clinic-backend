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
    return formatJSONResponse(
      {
        message: 'You should provide an email to create user',
        event,
      },
      StatusCodes.BAD_REQUEST,
    );
  }

  if (!password) {
    return formatJSONResponse(
      {
        message: 'You should provide a password to create user',
        event,
      },
      StatusCodes.BAD_REQUEST,
    );
  }

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(createUser);
