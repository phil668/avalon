"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
let SmsService = class SmsService {
    constructor() {
        this.codes = new Map();
    }
    sendVerificationCode(phoneNumber) {
        const currentTime = new Date();
        const existingEntry = this.codes.get(phoneNumber);
        if (existingEntry) {
            const timeSinceLastSent = (currentTime.getTime() - existingEntry.lastSent.getTime()) / 1000;
            if (timeSinceLastSent < 60) {
                throw new common_1.BadRequestException('Verification code can only be sent once per minute');
            }
        }
        const code = this.generateCode();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        this.codes.set(phoneNumber, {
            code,
            expiry,
            lastSent: currentTime,
            sent: true,
        });
        console.log(`Sending code ${code} to ${phoneNumber}`);
    }
    verifyCode(phoneNumber, code) {
        const storedCode = this.codes.get(phoneNumber);
        if (storedCode &&
            storedCode.code === code &&
            storedCode.expiry > new Date()) {
            this.codes.delete(phoneNumber);
            return true;
        }
        return false;
    }
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)()
], SmsService);
//# sourceMappingURL=sms.service.js.map