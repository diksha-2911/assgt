import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class AssignItemDto {
  @IsAlpha()
  @IsNotEmpty()
  memberName: string;

  @IsString()
  @IsNotEmpty()
  workItemId: string;
}
