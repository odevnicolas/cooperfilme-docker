import { Injectable } from "@nestjs/common";
import { Script } from "src/core/entities/script";
import { IScriptRepository } from 'src/core/repositories/script/script';
import { IUserRepository } from "src/core/repositories/user/user";
import { IIndex } from "src/core/utils/filters";
import { formatOrderBy } from "src/core/utils/format-order-by";

@Injectable()
export class GetAllScriptsUseCase {
  constructor(
    private readonly scriptRepository: IScriptRepository,
    private readonly userRepository: IUserRepository,
  ) { }

  async execute({ where: filter, orderBy, order, skip, take, userId }: IIndex): Promise<{ count: number, rows: Script[] }> {
    const user = await this.userRepository.findOne(userId)

    if (user.role === 'CLIENT') {
      filter.userId = user.id;
    }

    return await this.scriptRepository.index({
      where: filter,
      orderBy: formatOrderBy(orderBy, order),
      skip,
      take
    })
  }
}