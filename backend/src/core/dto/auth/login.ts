import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/core/entities/user";
import { fieldFormatInvalid, fieldRequired } from "src/core/helpers/messages";

export class IAuthLoginRequest {
  @IsNotEmpty({ message: fieldRequired("Usuário") })
  @IsString({ message: fieldFormatInvalid("Usuário") })
  username: string;

  @IsNotEmpty({ message: fieldRequired("Senha") })
  @IsString({ message: fieldFormatInvalid("Senha") })
  password: string;
}

export class IAuthLoginResponse {
  token: string;
  expiresIn: number;
  acess: User;
}