import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot(),
      // TypeOrmModule.forRoot(typeormConfig),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: +configService.get<number>('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DATABASE'),
              synchronize: true,
              autoLoadEntities: true,
          }),
          inject: [ConfigService],
      }),
      UserModule,
      AuthModule,
      CategoryModule,
      ProductsModule,
      OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

