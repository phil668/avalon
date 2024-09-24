import {
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber('CN')
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string; // 可选字段

  @IsNumberString()
  @Length(6, 6)
  verificationCode: string;
}
