import 'source-map-support/register';
import { StatusCodes } from 'http-status-codes';
import type { ValidatedEventAPIGatewayProxyEvent } from '@/libs/apiGateway';
import { formatJSONResponse } from '@/libs/apiGateway';
import { middyfy } from '@/libs/lambda';
import schema from './schema';
import { CognitoUserRepo } from '@/framework/repositories/CognitoUserRepo';
import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { UserDto } from '@/core/types/User';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const { email, password } = event.body;

  // remove this and remove from tests
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

  const cognitoUserRepo = new CognitoUserRepo();
  const createUserUseCase = new CreateUserUseCase(cognitoUserRepo);

  const userDto: UserDto = {
    email,
    password,
  };

  const user = await createUserUseCase.execute(userDto);

  return formatJSONResponse({
    message: 'User sucessfully created!',
    user,
    event,
  });
};

export const main = middyfy(createUser);
