import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IAuthLoginRequest, IAuthLoginResponse } from 'src/core/dto/auth/login';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post("singIn")
  singIn(
    @Body() payload: IAuthLoginRequest
  ): Promise<IAuthLoginResponse> {
    return this.authService.singIn(payload);
  }
}
