//import { Test, TestingModule } from '@nestjs/testing';
//import { AuthController } from './auth.controller';

//escribe('AuthController', () => {
//  let controller: AuthController;

//  beforeEach(async () => {
//    const module: TestingModule = await Test.createTestingModule({
//      controllers: [AuthController],
//    }).compile();
//
//    controller = module.get<AuthController>(AuthController);
//  });
//
//  it('should be defined', () => {
//    expect(controller).toBeDefined();
//  });
//});


import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}