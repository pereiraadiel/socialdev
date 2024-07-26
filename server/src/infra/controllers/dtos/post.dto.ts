import { IsOptional, IsString, Length } from 'class-validator';

export class CreatePostBodyDTO {
  @IsString()
  @Length(5, 255)
  title: string;

  @IsString()
  @Length(30)
  content: string;
}

export class GetManyPostsQueryDTO {
  @IsString()
  ownerId: string;

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: string;
}
