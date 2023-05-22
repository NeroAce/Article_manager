import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  details: string;

  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsNumber()
  categoriesId: number;
}
