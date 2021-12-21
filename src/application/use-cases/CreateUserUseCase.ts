import { ICreateUserUseCase } from '@/core/interfaces/ICreateUserUseCase';
import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { User, UserDto } from '@/core/types/User';

// https://github.com/epratik/lambda-cleanarchitecture/tree/main/src/application/use_cases

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(user: UserDto): Promise<User> {
    return this.userRepo.createUser(user);
  }
}
