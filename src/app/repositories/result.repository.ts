import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ResultRepositoryInterface } from './interfaces/result.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
import { Console } from 'console'
const jwt = require('jsonwebtoken')

@Service({ global: true })
class ResultRepository extends BaseRepository<Result> implements ResultRepositoryInterface<Result> {
  constructor(@ModelContainer(Result.tableName) Result: ModelCtor<Result>) {
    super(Result)
  }

  async findByLoginTest(email: string, ass_id: string) {
    return this.findByCondition({
      where: { email: email, assr_id: ass_id },
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
}

export default ResultRepository
