import { Status } from '@prisma/client';
import {
  IsAlpha,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Status, {
    message: 'status must be one of: OPEN, IN_PROGRESS, DONE',
  })
  status: Status;
}
