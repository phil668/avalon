import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerificationCodeDto } from 'src/sms/sms.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-verification-code')
  async sendVerificationCode(@Body() verificationCodeDto: VerificationCodeDto) {
    return this.userService.sendVerificationCode(verificationCodeDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
