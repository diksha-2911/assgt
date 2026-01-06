import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsAlpha()
  @IsNotEmpty()
  role: string;
}
