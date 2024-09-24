import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SmsService } from 'src/sms/sms.service';
import { VerificationCodeDto } from 'src/sms/sms.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly smsService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, smsService: SmsService, jwtService: JwtService);
    sendVerificationCode(verificationCodeDto: VerificationCodeDto): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
}
