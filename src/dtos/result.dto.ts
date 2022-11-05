import { Expose } from 'class-transformer'
import { IsEmail, Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateResultDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  IsEmail!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  assr_id!: string
}

export class UpdateResultDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number

  @Expose()
  @IsNumber()
  visual!: number

  @Expose()
  @IsNumber()
  memory!: number

  @Expose()
  @IsNumber()
  verbal!: number

  @Expose()
  @IsNumber()
  logical!: number

  @Expose()
  @IsNumber()
  numerical!: number

  @Expose()
  @IsNumber()
  personality!: number
}

export class LoginResultDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  IsEmail!: string
}
