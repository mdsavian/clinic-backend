import { mock } from 'jest-mock-extended';
import { UserDto } from '@/core/types/User';
import { IUserRepo } from '@/core/interfaces/IUserRepo';
import { CreateUserUseCase } from './CreateUserUseCase';

const mockUserDto = mock<UserDto>();
const mockUserRepo = mock<IUserRepo>();

mockUserRepo.createUser.mockImplementation(() =>
  Promise.resolve({
    id: '123',
    email: mockUserDto.email,
    password: mockUserDto.password,
  }),
);

describe('CreateUserUseCase', () => {
  describe('Given a user DTO', () => {
    it('Should create an user', async () => {
      const createUserUseCase = new CreateUserUseCase(mockUserRepo);
      const userCreated = await createUserUseCase.execute(mockUserDto);

      expect(userCreated.id).toBe('123');
    });
  });
});
