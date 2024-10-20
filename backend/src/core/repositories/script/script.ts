import { ICreateScriptRequest, IUpdateScriptRequest } from "src/core/dto/script/script-create";
import { Script } from "src/core/entities/script";
import { DbQueryFilter } from "src/core/utils/db-query-filter";

export abstract class IScriptRepository {
  abstract index({ include, orderBy, where, skip, take }: DbQueryFilter<Script>): Promise<{ count: number, rows: Script[] }>;
  abstract create(payload: ICreateScriptRequest, userId: string): Promise<void>
  abstract update(payload: IUpdateScriptRequest): Promise<void>
}