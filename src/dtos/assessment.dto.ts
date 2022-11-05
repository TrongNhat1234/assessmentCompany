import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator'

export class CreateAssessmentDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  ass_id!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  name!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  hiring_position!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  hr_id!: string

  @Expose()
  @IsDate()
  start_date!: Date

  @Expose()
  @IsDate()
  end_date!: Date
}
