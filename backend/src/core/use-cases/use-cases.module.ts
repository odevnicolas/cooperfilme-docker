import { Module, Provider } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { SinginAuthUseCase } from "./auth/singin/singin-auth.use-case";
import { CreateScriptsUseCase } from "./script/create-script/create-script.use-case";
import { GetAllScriptsUseCase } from "./script/getAll/getall-script.use-case";
import { UpdateScriptsUseCase } from "./script/update-status/update-status.use-case";
import { CreateUserUseCase } from "./user/create-user/create-user.use-case";

const userUseCases: Provider[] = [
  CreateUserUseCase,
];

const authUseCases: Provider[] = [
  SinginAuthUseCase,
]

const scrptUseCases: Provider[] = [
  GetAllScriptsUseCase,
  CreateScriptsUseCase,
  UpdateScriptsUseCase
]

const useCases = [
  ...userUseCases,
  ...authUseCases,
  ...scrptUseCases,
]

@Module({
  imports: [RepositoriesModule, DatabaseModule],
  providers: useCases,
  exports: useCases,
})
export class UseCasesModule { }