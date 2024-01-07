import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AbiJsonToBinDTO } from './app.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Action } from 'eosjs/dist/eosjs-serialize';

const logger: Logger = new Logger('AppController');

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('abijsontobin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '用户请求提现',
  })
  @ApiOkResponse({
      description: `{
      "statusCode": 200,
      "data": {
      },
      "time": "2019-09-06T06:03:43.253Z"
      }`
  })
  async abiJsonToBin(@Body() dto: AbiJsonToBinDTO) {
    
    const nodeUrl = "https://eos.greymass.com"
    // logger.debug(dto.args)
    const action: Action = {
      account: dto.code,
      name: dto.action,
      data: dto.args,
      authorization: []
    };
    return this.appService.serializeActions(nodeUrl, [action])
  }
}
