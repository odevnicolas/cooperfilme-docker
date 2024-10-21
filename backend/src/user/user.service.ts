import { Injectable } from '@nestjs/common';
import { IUserCreateRequest } from 'src/core/dto/user/user-create';
import { User } from 'src/core/entities/user';
import { CreateUserUseCase } from './../core/use-cases/user/create-user/create-user.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
  ) { }

  async createUser(data: IUserCreateRequest): Promise<User> {
    return await this.createUserUseCase.execute(data);
  }
}
