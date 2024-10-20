import { Injectable } from "@nestjs/common";
import { ICreateScriptRequest } from "src/core/dto/script/script-create";
import { IScriptRepository } from 'src/core/repositories/script/script';
import { IUserRepository } from "src/core/repositories/user/user";

@Injectable()
export class CreateScriptsUseCase {
  constructor(
    private readonly ScriptRepository: IScriptRepository,
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(payload: ICreateScriptRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(payload.email)
    await this.ScriptRepository.create(payload, user.id);
  }
}