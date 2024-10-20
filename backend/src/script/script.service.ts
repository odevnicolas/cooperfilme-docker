import { Injectable } from '@nestjs/common';
import { ICreateScriptRequest, IUpdateScriptRequest } from 'src/core/dto/script/script-create';
import { Script } from 'src/core/entities/script';
import { CreateScriptsUseCase } from 'src/core/use-cases/script/create-script/create-script.use-case';
import { GetAllScriptsUseCase } from 'src/core/use-cases/script/getAll/getall-script.use-case';
import { UpdateScriptsUseCase } from 'src/core/use-cases/script/update-status/update-status.use-case';
import { IIndex } from 'src/core/utils/filters';

@Injectable()
export class ScriptService {
  constructor(
    private readonly getAllScriptsUseCase: GetAllScriptsUseCase,
    private readonly createScriptUseCase: CreateScriptsUseCase,
    private readonly updateStatusUseCase: UpdateScriptsUseCase,
  ) { }

  async getAllScripts({ where, orderBy, order, skip, take, userId }: IIndex): Promise<{ count: number, rows: Script[] }> {
    return await this.getAllScriptsUseCase.execute({ where, orderBy, order, skip, take, userId });
  }

  async createScript(payload: ICreateScriptRequest): Promise<void> {
    return await this.createScriptUseCase.execute(payload);
  }

  async updateStatus(payload: IUpdateScriptRequest,): Promise<void> {
    return await this.updateStatusUseCase.execute(payload);
  }
}
