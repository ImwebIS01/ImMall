import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

// input-output dto 모두 있어야 함
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userRepository.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(idx: number): Promise<User> {
    try {
      return this.userRepository.findOne(idx);
    } catch (error) {
      throw error;
    }
  }

  async getOneByCode(code: string): Promise<User> {
    try {
      return this.userRepository.findOneByCode(code);
    } catch (error) {
      throw error;
    }
  }

  async getOneByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOneByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async setOne(idx: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne(idx);
      const name = updateUserDto.name ? updateUserDto.name : user.name;
      const email = updateUserDto.email ? updateUserDto.email : user.email;
      const passwd = updateUserDto.passwd ? updateUserDto.passwd : user.passwd;
      const callNum = updateUserDto.callNum
        ? updateUserDto.callNum
        : user.callNum;

      const updatedUser: User = new User(idx, name, email, passwd, callNum);
      return this.userRepository.update(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async remove(idx: number): Promise<User> {
    try {
      return await this.userRepository.remove(idx);
    } catch (error) {
      throw error;
    }
  }
}
