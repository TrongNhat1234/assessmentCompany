import {
  BelongsToMany,
  BelongsTo,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import Assessment from './assessment.entity'
import AssessmentListGame from './assessmentlistgame.entity'
import Hr from './hr.entity'

import { HrListGame } from './hrlistgame.entity'
import { Game } from './game.entity'

@Table({
  tableName: 'listgames',
})
export default class ListGame extends Model<ListGame> {
  @PrimaryKey
  @Column
  game_id!: string

  @Column
  type!: string

  @Column
  status!: string

  @Column
  total_time!: number

  @Column
  description!: string

  @HasMany(() => Game)
  games: Game[]

  @BelongsToMany(() => Hr, () => HrListGame)
  hrs: Hr[]

  @BelongsToMany(() => Assessment, () => AssessmentListGame)
  assessments: Assessment[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { ListGame }
