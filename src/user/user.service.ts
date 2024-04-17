import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtAuthService: JwtService,
  ) {}

  async loginUser(userLogin: LoginDto) {
    try {
      const { email, password } = userLogin;
      const findUser = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        throw new UnauthorizedException(
          'Usuario no encontrado en la base de datos',
        );
      }

      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (!checkPassword) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      // firmar el token xd
      const payload = { id: findUser.id, name: findUser.username };
      const token = await this.jwtAuthService.sign(payload);

      const data = {
        user: findUser,
        token: token,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(newUserData: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);

      const newUser = this.userRepository.create({
        ...newUserData,
        password: hashedPassword,
      });

      const validateData = await this.userRepository.findOne({
        where: {
          username: newUser.username,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });

      if (validateData) {
        console.log('El usuario ya existe en la base de datos');
        throw new BadRequestException('El usuario ya existe');
      }

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}