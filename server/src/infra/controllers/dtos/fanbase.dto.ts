import { IsString } from 'class-validator';

export class RequestFanbaseQueryDTO {
  @IsString()
  heroId: string;
}
