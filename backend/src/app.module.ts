import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './core/database/prisma.service';
import { UserModule } from './user/user.module';
import { ScriptModule } from './script/script.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), ScriptModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
