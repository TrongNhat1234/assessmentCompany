import {
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import ListGame from './listgame.entity'

@Table({
  tableName: 'games',
})
export default class Game extends Model<Game> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  question!: string

  @Column
  answer!: number

  @Column
  level!: number

  @ForeignKey(() => ListGame)
  @Column
  game_id!: string

  @BelongsTo(() => ListGame)
  listgame: ListGame

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Game }
