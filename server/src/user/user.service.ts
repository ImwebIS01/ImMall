import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

// input-output dto 모두 있어야 함
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      const salt: string = await bcrypt.genSalt();
      const hashedPasswd = await bcrypt.hash(createUserDto.passwd, salt);
      createUserDto.passwd = hashedPasswd;

      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async login(authCredentialDto: AuthCredentialDto): Promise<string> {
    try {
      const { email, passwd } = authCredentialDto;

      const user = await this.userRepository.findOneByEmail(email);
      if (user && (await bcrypt.compare(passwd, user.passwd))) {
        const payload = { name: user.name, email: email };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
      } else {
        throw new UnauthorizedException('잘못된 이메일 또는 비밀번호 입니다.');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<GetUserDto[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(idx: number): Promise<GetUserDto> {
    try {
      return this.userRepository.findOne(idx);
    } catch (error) {
      throw error;
    }
  }

  async getOneByCode(code: string): Promise<GetUserDto> {
    try {
      return this.userRepository.findOneByCode(code);
    } catch (error) {
      throw error;
    }
  }

  async getOneByEmail(email: string): Promise<GetUserDto> {
    try {
      return this.userRepository.findOneByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async setOne(idx: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    try {
      const user: GetUserDto = await this.userRepository.findOne(idx);
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

  async remove(idx: number): Promise<GetUserDto> {
    try {
      return await this.userRepository.remove(idx);
    } catch (error) {
      throw error;
    }
  }
}
