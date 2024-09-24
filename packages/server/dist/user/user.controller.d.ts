import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerificationCodeDto } from 'src/sms/sms.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    sendVerificationCode(verificationCodeDto: VerificationCodeDto): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        user: import("./user.entity").User;
        token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: import("./user.entity").User;
        token: string;
    }>;
}
