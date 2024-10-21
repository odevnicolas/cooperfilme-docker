import { HttpStatus, Injectable } from "@nestjs/common";
import { createHmac, randomBytes } from "crypto";
import { User } from "src/core/entities/user";
import { IUserCreate, IUserRepository } from "src/core/repositories/user/user";
import { Warning } from "src/core/utils/error";
@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) { }

  private hashPassword(password: string): { hash: string, salt: string } {
    const algorithm = 'sha256';
    const salt = randomBytes(16).toString('hex');

    const hash = createHmac(algorithm, salt)
      .update(password)
      .digest('hex');

    return { hash, salt };
  }

  async execute(payload: IUserCreate): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(payload.email);
    if (userAlreadyExists) {
      throw new Warning("Email já se encontra em uso", HttpStatus.BAD_REQUEST);
    }
    const { hash, salt } = this.hashPassword(payload.password);
    return await this.userRepository.create({
      ...payload,
      password: hash,
      salt: salt
    });
  }
}
