import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async loginUser() {
    try {
         
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createUser(newUserData: CreateUserDto) {
    try {
      // const hashedPassword = await bcrypt.hash(newUserData.password, 10); 

      const newUser = this.userRepository.create({
        ...newUserData,
        // password: hashedPassword, 
      });

      const validateData = await this.userRepository.findOne({
        where: {
          username: newUser.username,
          lastName: newUser.lastName,
          email: newUser.email,
        }
      });

      if(validateData){
        console.log('el usuario ya existe en la db');
        throw new Error('el usuario ya existe')
      }

      const saveUser = await this.userRepository.save(newUser);

      return saveUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
