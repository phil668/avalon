import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SmsService } from 'src/sms/sms.service';
import { VerificationCodeDto } from 'src/sms/sms.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly smsService: SmsService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 发送验证码
   * @param verificationCodeDto
   */
  async sendVerificationCode(verificationCodeDto: VerificationCodeDto) {
    await this.smsService.sendVerificationCode(verificationCodeDto.phoneNumber);
  }

  /**
   * 注册用户
   * @param createUserDto
   * @returns
   */
  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const { phoneNumber, password, verificationCode } = createUserDto;
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }
    const existingUser = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (existingUser) {
      throw new ConflictException('Phone number already exists');
    }

    const isCodeValid = this.smsService.verifyCode(
      phoneNumber,
      verificationCode,
    );
    if (!isCodeValid) {
      throw new BadRequestException('Invalid verification code');
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
    });

    return { user, token };
  }

  /**
   * 登录
   * @param loginUserDto
   * @returns
   */
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: User; token: string }> {
    const { phoneNumber, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { phoneNumber, password },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
    });
    return { user, token };
  }
}
