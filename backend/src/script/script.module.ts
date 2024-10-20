import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/core/use-cases/use-cases.module';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';

@Module({
  imports: [UseCasesModule],
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule { }
