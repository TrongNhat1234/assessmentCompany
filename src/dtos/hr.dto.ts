import { Expose } from 'class-transformer'
import { IsEmail, Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateHrDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  hr_id!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  name!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  role!: string
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  password!: string
}

export class LoginHrDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  password!: string
}
