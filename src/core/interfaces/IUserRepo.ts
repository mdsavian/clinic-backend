import { User, UserDto } from '@/core/types/User';

export interface IUserRepo {
  createUser(user: UserDto): Promise<User>;
}
