import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateHrListGameDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  hr_id!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  game_id!: string
}
