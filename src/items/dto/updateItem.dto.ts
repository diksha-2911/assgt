import { Status } from '@prisma/client';
import { IsAlpha, IsNotEmpty, isString, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsAlpha()
  title: string;

  @IsAlpha()
  description: string;

  @IsAlpha()
  @IsNotEmpty()
  status: Status;
}
