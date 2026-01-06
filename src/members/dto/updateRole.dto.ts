import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsAlpha()
  @IsNotEmpty()
  role: string;
}
