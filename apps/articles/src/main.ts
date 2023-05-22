import { NestFactory } from '@nestjs/core';
import { ArticlesModule } from './articles.module';
import { ValidationPipe } from '@nestjs/common';

import * as fs from 'fs';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from 'libs';
import { hostname } from 'os';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

//for Morgan
const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

//For Swagger
const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
const configSwager = new DocumentBuilder()
  .setTitle('API')
  .setDescription('Normal API')
  .setVersion('1.0')
  .addTag('Parents')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(ArticlesModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: '*' });
  app.use(morgan('dev', { stream: logStream }));
  const document = SwaggerModule.createDocument(app, configSwager, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3002, '0.0.0.0');
}
bootstrap();
