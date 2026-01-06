import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class FindAllItemsDto {
  // Pagination
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  // Filters
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  assignedToId?: string;

  @IsOptional()
  @IsEnum(Status, {
    message: 'status must be one of: OPEN, IN_PROGRESS, DONE',
  })
  status?: string;
}
