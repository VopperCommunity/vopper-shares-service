import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants/strategy.guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]), 
    ConfigModule,
    JwtModule.register({
      secret: constants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
