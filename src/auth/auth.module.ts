//import { Module } from '@nestjs/common';
//import { AuthService } from './auth.service';
//import { AuthController } from './auth.controller';

//@Module({
//  providers: [AuthService],
//  controllers: [AuthController]
//})
//export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: 'secretKey123',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}