import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { User } from "src/core/entities/user";
import { DbQueryFilter } from "src/core/utils/db-query-filter";
import { Warning } from "src/core/utils/error";
import { IUserCreate, IUserRepository, IUserUpdate } from "./user";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly databaseService: PrismaService
  ) { }
  index({ select, include, orderBy, where, skip, take }: DbQueryFilter<User, User>): Promise<{ count: number; rows: User[]; }> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<User | null> {
    return await this.databaseService.user.findUnique({ where: { id } })
  }

  async create(data: IUserCreate): Promise<null> {
    try {
      await this.databaseService.user.create({ data })
      return
    } catch (error) {
      throw new Warning("Ocorreu um erro ao cadastrar o usuário.", HttpStatus.BAD_REQUEST, error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.databaseService.user.findUnique({ where: { email } })
  }

  async findByUsername(name: string): Promise<User | null> {
    return await this.databaseService.user.findFirst({ where: { name } })
  }


  show(id: string, include?: Partial<{ id: boolean; name: boolean; email: boolean; password: boolean; role: boolean; createdAt: boolean; updatedAt: boolean; scripts: boolean; }>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: IUserUpdate): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}