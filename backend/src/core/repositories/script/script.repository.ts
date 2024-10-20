import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { ICreateScriptRequest, IUpdateScriptRequest } from "src/core/dto/script/script-create";
import { Script } from "src/core/entities/script";
import { DbQueryFilter } from "src/core/utils/db-query-filter";
import { Warning } from "src/core/utils/error";
import { IScriptRepository } from "./script";

@Injectable()
export class ScriptRepository implements IScriptRepository {
  constructor(
    private readonly databaseService: PrismaService
  ) { }
  async index({ include, orderBy, where, skip, take }: DbQueryFilter<Script>): Promise<{ count: number, rows: Script[] }> {
    try {
      const [count, rows] = await this.databaseService.$transaction([
        this.databaseService.script.count({
          where,
        }),
        this.databaseService.script.findMany({
          where,
          include,
          orderBy,
          skip,
          take
        })
      ]);

      return {
        count,
        rows
      }
    } catch (error) {
      console.log(error);
      throw new Warning("Ocorreu um erro ao consultar os roteiros.", HttpStatus.BAD_REQUEST, error);
    }
  }

  async create(payload: ICreateScriptRequest, userId: string): Promise<void> {
    try {
      await this.databaseService.script.create({
        data: { ...payload, userId }
      })
    } catch (error) {
      throw new Warning("Ocorreu um erro ao criar o roteiro.", HttpStatus.BAD_REQUEST, error);
    }
  }

  async update(payload: IUpdateScriptRequest): Promise<void> {
    try {
      await this.databaseService.script.update({
        where: {
          id: payload.scriptId
        },
        data: {
          status: payload.status as any,
          responsibleId: payload.responsibleId,
        }
      })
    } catch (error) {
      throw new Warning("Ocorreu um erro ao editar o status do roteiro.", HttpStatus.BAD_REQUEST, error);
    }
  }
}