import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

const logger: Logger = new Logger('AppBootstrap');

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('FT API Document')
    .setDescription('The FT API description')
    .setVersion('1.0')
    // .addTag('app')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include:  [ AppModule],
    deepScanRoutes: true,
   });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'EOSJS API Docs',
  };
  SwaggerModule.setup('docs/app', app, document, customOptions);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  logger.log('Swagger documents set up')
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
