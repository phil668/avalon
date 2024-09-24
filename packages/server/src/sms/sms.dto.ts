import { IsPhoneNumber } from 'class-validator';

export class VerificationCodeDto {
  @IsPhoneNumber('CN', { message: 'Invalid phone number' })
  phoneNumber: string;
}
