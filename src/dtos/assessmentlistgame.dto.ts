import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator'

export class CreateAssessmentListgameDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  ass_id!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  game_id!: string
}
