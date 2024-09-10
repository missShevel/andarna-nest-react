import { IsString, IsOptional, IsUUID, IsHexColor } from 'class-validator';

export class CreateOutcomeCategoryDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}

export class UpdateOutcomeCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsHexColor()
  color?: string;
}
