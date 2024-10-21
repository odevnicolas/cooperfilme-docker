import { IsNotEmpty, IsString, Length } from "class-validator";
import { Script } from "src/core/entities/script";
import { fieldFormatInvalid, fieldRequired, minContent } from "src/core/helpers/messages";
import { IUserCreate } from "src/core/repositories/user/user";

export class IUserCreateRequest implements IUserCreate {
  @IsNotEmpty({ message: fieldRequired("nome") })
  @IsString({ message: fieldFormatInvalid("nome") })
  name: string;

  @IsNotEmpty({ message: fieldRequired("email") })
  @IsString({ message: fieldFormatInvalid("email") })
  email: string;

  @IsNotEmpty({ message: fieldRequired("senha") })
  @Length(12, undefined, { message: minContent(12, "senha") })
  password: string;

  salt: string;

  script: Script[]
}