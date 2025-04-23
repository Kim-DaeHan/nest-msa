import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '생성일',
    example: '2024-04-23T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2024-04-23T00:00:00.000Z',
  })
  updatedAt: Date;
}
