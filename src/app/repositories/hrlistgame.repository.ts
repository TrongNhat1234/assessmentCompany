import HrListGame from '@models/entities/hrlistgame.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HrListGameRepositoryInterface } from './interfaces/hrlistgame.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
import { Console } from 'console'
const jwt = require('jsonwebtoken')

@Service({ global: true })
class HrListGameRepository
  extends BaseRepository<HrListGame>
  implements HrListGameRepositoryInterface<HrListGame>
{
  constructor(@ModelContainer(HrListGame.tableName) HrListGame: ModelCtor<HrListGame>) {
    super(HrListGame)
  }

  async findByHrId(hr_id: string) {
    return HrListGame.findAll({
      where: { hr_id: hr_id },
      raw: true,
    })
  }

  async findByGameId(game_id: string) {
    return HrListGame.findAll({
      where: { game_id: game_id },
      raw: true,
    })
  }
  async findByHrGameId(hr_id: string, game_id: string) {
    return HrListGame.findAll({
      where: { game_id: game_id, hr_id: hr_id },
      raw: true,
    })
  }
}

export default HrListGameRepository
