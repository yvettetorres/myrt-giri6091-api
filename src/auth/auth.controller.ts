//import { Controller } from '@nestjs/common';

//@Controller('auth')
//export class AuthController {}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ schema: { properties: { username: { type: 'string' }, password: { type: 'string' } } } })
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  @ApiBody({ schema: { properties: { username: { type: 'string' }, password: { type: 'string' } } } })
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}