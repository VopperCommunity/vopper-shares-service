import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('auth/login')
  loginUser(@Body() userLogin){
    return this.userService.loginUser()
  }

  @Post('auth/create-user')
  createUser(@Body() newUserData: CreateUserDto) {
    return this.userService.createUser(newUserData);
  }

}
