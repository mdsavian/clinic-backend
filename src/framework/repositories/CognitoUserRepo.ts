import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { User, UserDto } from '@/core/types/User';

export class CognitoUserRepo implements IUserRepo {
  createUser(userDto: UserDto): User {
    // implement the logic to create user on cognito
    return { ...userDto, id: '1111' };
  }
}
