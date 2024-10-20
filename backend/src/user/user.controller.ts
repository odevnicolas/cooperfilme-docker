import { Body, Controller, Post } from '@nestjs/common';
import { IUserCreateRequest } from 'src/core/dto/user/user-create';
import { User } from 'src/core/entities/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  signUp(
    @Body() payload: IUserCreateRequest
  ): Promise<User> {
    return this.userService.createUser(payload);
  }
}
