import { Injectable } from '@nestjs/common';
import { IUserCreateRequest } from 'src/core/dto/user/user-create';
import { User } from 'src/core/entities/user';
import { createUserUseCase } from './../core/use-cases/user/create-user/create-user.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: createUserUseCase,
  ) { }

  async createUser(data: IUserCreateRequest): Promise<User> {
    return await this.createUserUseCase.execute(data);
  }
}
