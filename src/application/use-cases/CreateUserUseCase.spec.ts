// import { ICreateUserUseCase } from '@/core/interfaces/ICreateUserUseCase';
// import { IUserRepo } from '@/core/interfaces/IUserRepo';
// import { User, UserDto } from '@/core/types/User';

// // https://github.com/epratik/lambda-cleanarchitecture/tree/main/src/application/use_cases

// export class CreateUserUseCase implements ICreateUserUseCase {
//   constructor(private userRepo: IUserRepo) {
//     this.userRepo = userRepo;
//   }

//   async execute(user: UserDto): Promise<User> {
//     return this.userRepo.createUser(user);
//   }
// }

import { mock } from 'jest-mock-extended';
import { UserDto } from '@/core/types/User';
import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { CreateUserUseCase } from './CreateUserUseCase';

const mockUserDto = mock<UserDto>();
const mockUserRepo = mock<IUserRepo>();
mockUserRepo.createUser.mockReturnValueOnce({
  id: '123',
  email: mockUserDto.email,
  password: mockUserDto.password,
});

describe('CreateUserUseCase', () => {
  describe('Given a user DTO', () => {
    it('Should create an user', async () => {
      const createUserUseCase = new CreateUserUseCase(mockUserRepo);
      const userCreated = await createUserUseCase.execute(mockUserDto);

      expect(userCreated.id).toBe('123');
    });
  });
});
