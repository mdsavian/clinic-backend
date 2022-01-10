import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { User, UserDto } from '@/core/types/User';

export class CognitoUserRepo implements IUserRepo {
  // eslint-disable-next-line class-methods-use-this
  public async createUser(userDto: UserDto): Promise<User> {
    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

    console.log('opa eae');
    const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
      ClientId: process.env.USER_POOL_CLIENT_ID,
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
    // implement the logic to create user on cognito
    return { ...userDto, id: '1111' };
  }
}

// async signUp(user: UserAuth): Promise<string> {
//   const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
//     ClientId: <string>USER_POOL_CLIENT_ID,
//     Username: user.username,
//     Password: user.password,
//     UserAttributes: [
//       {
//         Name: 'name',
//         Value: user.name,
//       },
//       {
//         Name: 'phone_number',
//         Value: user.username,
//       },
//       {
//         Name: 'email',
//         Value: user.email,
//       },
//       {
//         Name: 'custom:type_id',
//         Value: user.documentType,
//       },
//       {
//         Name: 'custom:document',
//         Value: user.documentValue,
//       },
//       {
//         Name: 'custom:origin_id',
//         Value: user.origin,
//       },
//     ],
//   };
//   const userSignUp: SignUpResponse = await identityProvider
//     .signUp(params)
//     .promise();

//   // eslint-disable-next-line no-param-reassign
//   delete user.password;
//   Logger.info(`User SignUp success!`, user);
//   return userSignUp.UserSub;
// }
