import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface HrListGameRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByHrId(hr_id: string)
  findByGameId(game_id: string)
  findByHrGameId(hr_id: string, game_id: string)
}
