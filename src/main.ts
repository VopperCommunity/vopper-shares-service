import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './user/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  
  app.enableCors();
  app.setGlobalPrefix('/api/v1/')
  app.useGlobalGuards(new JwtAuthGuard()); 
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(port);
}
bootstrap();
