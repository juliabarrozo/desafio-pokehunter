import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // retorna erro se tiver propriedade não definida
    transform: true, // transforma payload em instância do DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
