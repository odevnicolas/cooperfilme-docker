import { ScriptStatus } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { fieldFormatInvalid, fieldRequired } from "src/core/helpers/messages";

export class ICreateScriptRequest {
  @IsNotEmpty({ message: fieldRequired("Nome") })
  @IsString({ message: fieldFormatInvalid("Nome") })
  name: string;

  @IsNotEmpty({ message: fieldRequired("Email") })
  @IsString({ message: fieldFormatInvalid("Email") })
  email: string;

  @IsNotEmpty({ message: fieldRequired("Número de Telefone") })
  @IsString({ message: fieldFormatInvalid("Número de Telefone") })
  phoneNumber: string;

  @IsNotEmpty({ message: fieldRequired("scriptFile") })
  scriptFile: string;

  @IsOptional()
  phoneNumerAlt: string;
}

export class IUpdateScriptRequest {
  @IsNotEmpty({ message: fieldRequired("Status") })
  @IsString({ message: fieldFormatInvalid("Status") })
  status: string;

  @IsNotEmpty({ message: fieldRequired("scriptId") })
  scriptId: ScriptStatus;

  @IsNotEmpty({ message: fieldRequired("scriptId") })
  responsibleId: string;
}