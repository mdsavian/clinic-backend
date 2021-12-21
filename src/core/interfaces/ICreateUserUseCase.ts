import { User, UserDto } from '@/core/types/User';

export interface ICreateUserUseCase {
  execute(user: UserDto): Promise<User>;
}
