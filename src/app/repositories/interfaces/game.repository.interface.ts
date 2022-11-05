import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface GameRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  getTestGameMemory(): Promise<any>
  getTestGameLevel(game_id: string, answer: number): Promise<any>
  getTestGameLevel2(game_id: string, answer: number, level: number): Promise<any>

  findByIdAnswer(id: number): Promise<any>
  findByListLevelGame(game_id: string, level: number): Promise<any>
}
