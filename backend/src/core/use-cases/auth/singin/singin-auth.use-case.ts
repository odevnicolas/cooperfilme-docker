import { HttpStatus, Injectable } from "@nestjs/common";
import { createHmac } from "crypto";
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

  private hashWithSalt(password: string, salt: string): string {
    const algorithm = 'sha256';
    return createHmac(algorithm, salt)
      .update(password)
      .digest('hex');
  }

  async execute(payload: IAuthSingin): Promise<any> {
    const isEmail = (username: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(username);
    };

    const authenticateUser = async (username: string): Promise<User> => {
      const user = isEmail(username)
        ? await this.userRepository.findByEmail(username)
        : await this.userRepository.findByUsername(username);

      if (!user) {
        throw new Warning("Usuário ou senha incorretos", HttpStatus.UNAUTHORIZED);
      }
      const hashedInputPassword = this.hashWithSalt(payload.password, user.salt);
      if (hashedInputPassword !== user.password) {
        throw new Warning("Usuário ou senha incorretos", HttpStatus.UNAUTHORIZED);
      }

      return user;
    };

    if (payload.username) {
      const user = await authenticateUser(payload.username);
      return this.authRepository.singIn(user);
    }
  }
}
