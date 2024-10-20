import { Module, Provider } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { IAuthRepository } from "./auth/auth";
import { AuthRepository } from "./auth/auth.repository";
import { IScriptRepository } from "./script/script";
import { ScriptRepository } from "./script/script.repository";
import { IUserRepository } from "./user/user";
import { UserRepository } from "./user/user.repository";


const repositories: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository
  },
  {
    provide: IAuthRepository,
    useClass: AuthRepository
  },
  {
    provide: IScriptRepository,
    useClass: ScriptRepository
  },
]

@Module({
  imports: [DatabaseModule],
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule { }