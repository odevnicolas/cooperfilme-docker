import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IAuthLoginResponse } from "src/core/dto/auth/login";
import { User } from "src/core/entities/user";
import { IAuthRepository } from "./auth";

@Injectable()
export class AuthRepository implements IAuthRepository {
  private jwtExpirationTime: number
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTime = +this.configService.get<number>('JWT_EXPIRATION_TIME')
  }

  async singIn(data: User): Promise<IAuthLoginResponse> {
    const isEmail = (username: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(username);
    };
    let usernameToUse;
    if (data.email && isEmail(data.email)) {
      usernameToUse = data.email;
    } else if (data.name) {
      usernameToUse = data.name;
    } else {
      throw new Error("Nenhum nome de usuário válido fornecido");
    }

    const payload = { sub: data.id, username: usernameToUse };
    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTime, acess: data };
  }

}