import { Expose } from 'class-transformer'
import { IsEmail, Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginAdminDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string
}
