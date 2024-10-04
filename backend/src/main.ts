import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: `*`,
    credentials: false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Api-Key',
      'Content-Type',
      'Accept',
      'Authorization',
      'Content-Type',
      'access-control-allow-origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
      'access-control-allow-credentials',
      'access-control-allow-methods',
      'Origin',
      'X-Requested-With',
      'signature',
    ],
    exposedHeaders: [
      'Authorization',
      'access-control-allow-credentials',
      'signature',
    ],
  });
  const config = new DocumentBuilder()
    .setTitle('Инвентаризация RESTAPI')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // /docs - путь к документации swagger
  console.log(`Server is running on port ${process.env.SERVER_PORT} ${"inventory_backend"}`);
  await app.listen(process.env.SERVER_PORT, "inventory_backend");
}

(async () => {
  await bootstrap();
})();
