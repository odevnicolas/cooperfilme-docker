import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { AuthGuard } from 'src/auth/auth.guard';
import { ICreateScriptRequest, IUpdateScriptRequest } from 'src/core/dto/script/script-create';
import { formatIndexFilters } from 'src/core/utils/filters';
import { ScriptService } from './script.service';

@UseGuards(AuthGuard)
@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) { }

  @Get('/all/:userId')
  async getAllScripts(
    @Req() request: Request,
    @Param('userId') userId: string
  ) {
    const { where, orderBy, order, skip, take } = formatIndexFilters(request);
    return await this.scriptService.getAllScripts({ userId, where, orderBy, order, skip, take });
  }


  @Post('create')
  async createScript(
    @Body() payload: ICreateScriptRequest
  ): Promise<void> {
    return await this.scriptService.createScript(payload);
  }

  @Patch('update-status')
  async updateStatus(
    @Body() payload: IUpdateScriptRequest
  ): Promise<void> {
    return await this.scriptService.updateStatus(payload);
  }
}
