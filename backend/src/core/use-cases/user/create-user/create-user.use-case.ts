import { HttpStatus, Injectable } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { User } from "src/core/entities/user";
import { IUserCreate, IUserRepository } from "src/core/repositories/user/user";
import { Warning } from "src/core/utils/error";


@Injectable()
export class createUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(payload: IUserCreate): Promise<User> {

    const userAlreadyExists = await this.userRepository.findByEmail(payload.email);
    if (userAlreadyExists)
      throw new Warning("Email ja se encontra em uso", HttpStatus.BAD_REQUEST);

    return await this.userRepository.create({
      ...payload,
      password: hashSync(payload.password, 10)
    });
  }
}