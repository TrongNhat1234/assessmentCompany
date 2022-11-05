import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface AssessmentListgameRepositoryInterface<M extends Model>
  extends BaseRepositoryInterface {
  findByAssId(ass_id: string): Promise<any>
  findByAssIdGameId(ass_id: string, game_id: string): Promise<any>

  DeleteByAssId(ass_id: string): Promise<any>
  DeleteByAssGameId(game_id: string, ass_id: string): Promise<any>
}
