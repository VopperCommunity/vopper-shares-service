import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { constants } from './constants/strategy.guard';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private userRepository: Repository<UserEntity>,
    // private jwtService: JwtService,
  ) { }

  // @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  loginUser(@Body() userLogin: LoginDto) {
    return this.userService.loginUser(userLogin);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('auth/user')
  // async user(@Req() request: Request) {
  //   try {
  //     const { authorization }: any = request.headers;
  //     if (!authorization || authorization.trim() === '') {
  //       throw new UnauthorizedException('Please provide token');
  //     }

  //     const authToken = authorization.replace(/bearer/gim, '').trim();

  //     const data = await this.jwtService.verify(authToken, {
  //       secret: constants.secret,
  //     });

  //     if (!data || !data.id) {
  //       throw new UnauthorizedException('Invalid JWT token');
  //     }

  //     const user = await this.userRepository.findOneBy({
  //        id: data._id
  //     });

  //     if (!user) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     // Retornar el resultado sin la contraseña
  //     const { password, ...result } = user;
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token or user not found');
  //   }
  // }

  @Post('auth/create-user')
  createUser(@Body() newUserData: CreateUserDto) {
    return this.userService.createUser(newUserData);
  }
}
