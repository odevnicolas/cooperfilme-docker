import { IAuthLoginResponse } from "src/core/dto/auth/login";
import { User } from "src/core/entities/user";

export interface IAuthSingin {
  username: string;
  password: string;
}
export abstract class IAuthRepository {
  abstract singIn(data: User): Promise<IAuthLoginResponse>;
}