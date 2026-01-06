import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class AssignItemDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  workItemId: string;
}
