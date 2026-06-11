import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1' 
  }
  )

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true 
  }))
  app.enableCors();
  
  // configuracion de swagger 
  const config = new DocumentBuilder()
  .setTitle('Task Manager API')
  .setDescription('Gestuin de tareas')
  .setVersion('1.0')
  .addTag('Tasks')
  .build();

const documet  = SwaggerModule.createDocument(app,config);
SwaggerModule.setup('api/docs', app, documet);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
