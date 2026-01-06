import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsAlpha()
  @IsNotEmpty()
  memberName: string;

  @IsString()
  description: string;
}
