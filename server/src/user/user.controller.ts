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

  /** 회원가입 컨트롤러 */
  @Post('sign-up/:site_code')
  async signUp(
    @Param('site_code') site_code: string,
    @Body() createUserDto: CreateUserDto
  ) {
    createUserDto.fk_site_code = site_code;
    return this.userService.register(createUserDto);
  }

  /** 로그인 컨트롤러 */
  @Post('sign-in/:site_code')
  async signIn(
    @Param() site_code: string,
    @Body() authCredentialDto: AuthCredentialDto,
    @Res() res: Response
  ) {
    authCredentialDto.fk_site_code = site_code;
    const token = await this.userService.login(authCredentialDto);
    return res.cookie('token', token).json(true);
  }

  /** 전체 유저 조회 컨트롤러 */
  @Get()
  async getAll(@Query() query): Promise<GetUserDto[] | object> {
    const { page, perPage } = query;
    return this.userService.getAll(+page, +perPage);
  }

  /** 사이트 전체 유저 조회 컨트롤러 */
  @Get(':site_code')
  async getAllBySite(
    @Param('site_code') site_code: string,
    @Query() query
  ): Promise<GetUserDto[] | object> {
    const { page, perPage } = query;
    return this.userService.getAll(+page, +perPage, site_code);
  }

  /** code로 조회 */
  @Get(':code')
  async getOneByCode(@Param('code') code: string) {
    return this.userService.getOne(code);
  }

  /** email로 조회 */
  @Get('email/:email')
  @UseGuards(AuthGuard())
  async getOneByEmail(
    @GetUser() user: GetUserDto,
    @Param('email') email: string
  ): Promise<GetUserDto> {
    if (user.email === email) return this.userService.getOneByEmail(email);
    throw new UnauthorizedException();
  }

  /** code로 수정*/
  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<GetUserDto> {
    return this.userService.setOne(code, updateUserDto);
  }

  /** code로 삭제 */
  @Delete(':code')
  async remove(@Param('code') code: string): Promise<GetUserDto> {
    return this.userService.remove(code);
  }

  /** 테이블 전체 행 삭제 */
  @Delete('list/all')
  async removeAll() {
    return this.userService.removeAll();
  }
}
