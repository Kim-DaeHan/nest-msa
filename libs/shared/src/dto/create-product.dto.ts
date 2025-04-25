import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: '상품 이름',
    example: '스마트폰',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '상품 설명',
    example: '최신 스마트폰입니다.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '상품 가격',
    example: 1000000,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: '상품 재고',
    example: 10,
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
