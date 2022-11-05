import Hr from '@models/entities/hr.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HrRepositoryInterface } from './interfaces/hr.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const jwt = require('jsonwebtoken')

@Service({ global: true })
class HrRepository extends BaseRepository<Hr> implements HrRepositoryInterface<Hr> {
  constructor(@ModelContainer(Hr.tableName) Hr: ModelCtor<Hr>) {
    super(Hr)
  }

  async findbylogin(email: string, password: string): Promise<Hr> {
    console.log(this.model)
    return this.findByCondition({
      where: { email: email, password: password },
      raw: true,
    })
  }

  async generateTokens(payload: any) {
    const token = jwt.sign({ id: payload }, 'mk', {
      expiresIn: '10h',
    })

    const refreshToken = jwt.sign({ id: payload }, 'mk', {
      expiresIn: '1h',
    })

    return { token, refreshToken }
  }

  async findByHrId(hr_id: string): Promise<Hr> {
    console.log(this.model)
    return this.findByCondition({
      where: { hr_id: hr_id },
      raw: true,
    })
  }
  async findByHremail(email: string): Promise<Hr> {
    console.log(this.model)
    return this.findByCondition({
      where: { email: email },
      raw: true,
    })
  }
}

export default HrRepository
