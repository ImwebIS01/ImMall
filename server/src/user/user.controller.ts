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
import { query, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get-user.dto';
import { GetUser } from 'src/custom.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 회원가입 컨트롤러 */
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto, @Query() query) {
    createUserDto.fk_site_code = query.site;
    return this.userService.register(createUserDto);
  }

  /** 로그인 컨트롤러 */
  @Post('sign-in')
  async signIn(
    @Query() query,
    @Body() authCredentialDto: AuthCredentialDto,
    @Res() res: Response
  ) {
    authCredentialDto.fk_site_code = query.site;
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
  @Get()
  async getAllBySite(@Query() query): Promise<GetUserDto[] | object> {
    const { page, perPage, site } = query;
    return this.userService.getAll(+page, +perPage, site);
  }

  /** code로 조회 */
  @Get(':code')
  async getOneByCode(@Param('code') code: string): Promise<GetUserDto> {
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
}
