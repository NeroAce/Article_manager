import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderBy } from './orderby.enum';

export class QueryDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  orderBy: string;

  @IsEnum(OrderBy)
  @IsOptional()
  type: OrderBy;
}
