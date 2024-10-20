import { Injectable } from "@nestjs/common";
import { IUpdateScriptRequest } from "src/core/dto/script/script-create";
import { IScriptRepository } from "src/core/repositories/script/script";


@Injectable()
export class UpdateScriptsUseCase {
  constructor(
    private readonly ScriptRepository: IScriptRepository,
  ) { }

  async execute(payload: IUpdateScriptRequest): Promise<void> {
    await this.ScriptRepository.update(payload);
  }
}