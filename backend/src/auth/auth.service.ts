import { Injectable } from '@nestjs/common';
import { IAuthLoginRequest, IAuthLoginResponse } from 'src/core/dto/auth/login';
import { SinginAuthUseCase } from './../core/use-cases/auth/singin/singin-auth.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly singinAuthUseCase: SinginAuthUseCase,
  ) { }

  singIn(payload: IAuthLoginRequest): Promise<IAuthLoginResponse> {
    return this.singinAuthUseCase.execute(payload);
  }
}
