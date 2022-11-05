import {
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
import Hr from './hr.entity'

@Table({
  tableName: 'hrlistgames',
})
export default class HrListGame extends Model<HrListGame> {
  @ForeignKey(() => Hr)
  @Column
  hr_id: string

  @ForeignKey(() => ListGame)
  @Column
  game_id: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { HrListGame }
