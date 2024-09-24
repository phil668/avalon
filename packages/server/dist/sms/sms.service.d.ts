export declare class SmsService {
    private codes;
    sendVerificationCode(phoneNumber: string): void;
    verifyCode(phoneNumber: string, code: string): boolean;
    private generateCode;
}
