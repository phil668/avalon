import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  private codes: Map<
    string,
    { code: string; expiry: Date; lastSent: Date; sent: boolean }
  > = new Map();

  /**
   * 发送验证码
   * @param phoneNumber
   */
  sendVerificationCode(phoneNumber: string) {
    const currentTime = new Date();
    const existingEntry = this.codes.get(phoneNumber);
    if (existingEntry) {
      const timeSinceLastSent =
        (currentTime.getTime() - existingEntry.lastSent.getTime()) / 1000;
      if (timeSinceLastSent < 60) {
        throw new BadRequestException(
          'Verification code can only be sent once per minute',
        );
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

    // 发送验证码到手机
    console.log(`Sending code ${code} to ${phoneNumber}`);
  }

  /**
   * 验证验证码
   * @param phoneNumber
   * @param code
   * @returns
   */
  verifyCode(phoneNumber: string, code: string): boolean {
    const storedCode = this.codes.get(phoneNumber);
    if (
      storedCode &&
      storedCode.code === code &&
      storedCode.expiry > new Date()
    ) {
      this.codes.delete(phoneNumber);
      return true;
    }
    return false;
  }

  /**
   * 生成验证码
   * @returns
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
