import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import config from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './user/constants/strategy.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    UserModule,
    AdminModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: 'loqueseaalaburguer',
      autoLoadEntities: true,
      entities: [UserEntity],
      synchronize: true, // ? sincroniza los cambios de las entities
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: constants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],

  controllers: [UserController, AdminController],
  providers: [UserService, AdminService],
})
export class AppModule { }
