import Game from '@models/entities/game.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { GameRepositoryInterface } from './interfaces/game.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
import { Console } from 'console'
const jwt = require('jsonwebtoken')

@Service({ global: true })
class GameRepository extends BaseRepository<Game> implements GameRepositoryInterface<Game> {
  constructor(@ModelContainer(Game.tableName) Game: ModelCtor<Game>) {
    super(Game)
  }

  async getTestGameMemory() {
    return Game.findAll({
      where: { game_id: 'game02' },
      raw: true,
      limit: 25,
      order: [['level', 'ASC']],
    })
  }

  async getTestGameLevel(game_id: string, answer: number) {
    return Game.findAll({
      attributes: ['id', 'question', 'level', 'game_id'],
      where: { game_id: game_id, answer: answer },
      raw: true,
    })
  }

  async getTestGameLevel2(game_id: string, answer: number, level: number) {
    return Game.findAll({
      attributes: ['id', 'question', 'level', 'game_id', 'answer'],
      where: { game_id: game_id, answer: answer, level: level },
      raw: true,
    })
  }
  async findByListLevelGame(game_id: string, level: number) {
    return Game.findAll({
      attributes: ['id', 'question', 'level', 'game_id'],
      where: { game_id: game_id, level: level },
      raw: true,
    })
  }

  async findByIdAnswer(id: number) {
    return Game.findOne({
      attributes: ['id', 'answer'],
      where: { id: id },
      raw: true,
    })
  }
}

export default GameRepository
