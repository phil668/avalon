"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const sms_service_1 = require("../sms/sms.service");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, smsService, jwtService) {
        this.userRepository = userRepository;
        this.smsService = smsService;
        this.jwtService = jwtService;
    }
    async sendVerificationCode(verificationCodeDto) {
        await this.smsService.sendVerificationCode(verificationCodeDto.phoneNumber);
    }
    async register(createUserDto) {
        const { phoneNumber, password, verificationCode } = createUserDto;
        if (password.length < 6) {
            throw new common_1.BadRequestException('Password must be at least 6 characters');
        }
        const existingUser = await this.userRepository.findOne({
            where: { phoneNumber },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Phone number already exists');
        }
        const isCodeValid = this.smsService.verifyCode(phoneNumber, verificationCode);
        if (!isCodeValid) {
            throw new common_1.BadRequestException('Invalid verification code');
        }
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        const token = this.jwtService.sign({
            id: user.id,
            phoneNumber: user.phoneNumber,
        });
        return { user, token };
    }
    async login(loginUserDto) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sms_service_1.SmsService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map