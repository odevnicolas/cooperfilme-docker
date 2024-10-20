import { HttpStatus, Injectable } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { User } from "src/core/entities/user";
import { IAuthRepository, IAuthSingin } from "src/core/repositories/auth/auth";
import { IUserRepository } from "src/core/repositories/user/user";
import { Warning } from "src/core/utils/error";


@Injectable()
export class SinginAuthUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(payload: IAuthSingin): Promise<any> {
    const isEmail = (username: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(username);
    };

    const authenticateUser = async (username: string): Promise<User> => {
      const user = isEmail(username)
        ? await this.userRepository.findByEmail(username)
        : await this.userRepository.findByUsername(username);
      if (!user || !compareSync(payload.password, user.password)) {
        throw new Warning("Usuário ou senha incorretos", HttpStatus.UNAUTHORIZED);
      }
      return user;
    };

    if (payload.username) {
      const user = await authenticateUser(payload.username);
      return this.authRepository.singIn(user)
    }
  }
}