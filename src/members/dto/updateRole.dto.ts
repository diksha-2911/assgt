import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  role: string;
}
