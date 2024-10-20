import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UseCasesModule } from 'src/core/use-cases/use-cases.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UseCasesModule, JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (cfgService: ConfigService) => ({
      secret: cfgService.get<string>('JWT_SECRET_KEY'),
      signOptions: { expiresIn: +cfgService.get<number>('JWT_EXPIRATION_TIME') },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
