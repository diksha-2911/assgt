import { IsAlpha, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsOptional()
  description: string;
}
