import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get-user.dto';
import { GetUser } from 'src/custom.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() authCredentialDto: AuthCredentialDto,
    @Res() res: Response
  ) {
    const { token, expiresIn } = await this.userService.login(
      authCredentialDto
    );
    return res.cookie('token', token).json(true);
  }

  @Get('test')
  async test() {
    return 'test';
  }

  @Get()
  async getAll(@Query() query): Promise<GetUserDto[]> {
    const { page, perPage } = query;
    return this.userService.getAll(+page, +perPage);
  }

  @Get(':idx')
  async getOne(@Param('idx') idx: number): Promise<GetUserDto> {
    return this.userService.getOne(+idx);
  }

  @Get('code/:code')
  async getOneByCode(@Param('code') code: string) {
    return this.userService.getOneByCode(code);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard())
  async getOneByEmail(
    @GetUser() user: GetUserDto,
    @Param('email') email: string
  ): Promise<GetUserDto> {
    if (user.email === email) return this.userService.getOneByEmail(email);
    throw new UnauthorizedException();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<GetUserDto> {
    return this.userService.setOne(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<GetUserDto> {
    return this.userService.remove(+id);
  }
}
