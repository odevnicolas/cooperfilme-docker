import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/core/use-cases/use-cases.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
