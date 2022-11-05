import LoginAdmin from '@models/entities/loginadmin.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { LoginAdminRepositoryInterface } from './interfaces/loginadmin.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
import { Console } from 'console'
const jwt = require('jsonwebtoken')

@Service({ global: true })
class LoginAdminRepository
  extends BaseRepository<LoginAdmin>
  implements LoginAdminRepositoryInterface<LoginAdmin>
{
  constructor(@ModelContainer(LoginAdmin.tableName) LoginAdmin: ModelCtor<LoginAdmin>) {
    super(LoginAdmin)
  }

  async findbylogin(email: string, password: string): Promise<LoginAdmin> {
    console.log(this.model)
    return this.findByCondition({
      where: { email: email, password: password },
      raw: true,
    })
  }

  async generateTokens(payload: any) {
    const token = jwt.sign({ id: payload }, 'mk', {
      expiresIn: '1h',
    })

    const refreshToken = jwt.sign({ id: payload }, 'mk', {
      expiresIn: '1h',
    })

    return { token, refreshToken }
  }
}

export default LoginAdminRepository
