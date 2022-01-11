import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { User, UserDto } from '@/core/types/User';

export class CognitoUserRepo implements IUserRepo {
  // eslint-disable-next-line class-methods-use-this
  public async createUser(userDto: UserDto): Promise<User> {
    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

    const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
      ClientId: process.env.COGNITO_USER_CLIENT_ID,

      Username: userDto.email,
      Password: userDto.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: userDto.email,
        },
      ],
    };

    const response = await cognitoIdentityServiceProvider
      .signUp(params)
      .promise();
    console.log(response);

    const user: User = { email: userDto.email, id: response.UserSub };
    return user;
  }
}
