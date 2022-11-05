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
import { AssessmentListGame } from './assessmentlistgame.entity'
import Result from './result.entity'
import Hr from './hr.entity'

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column
  ass_id!: string

  @Column
  name!: string

  @Column
  hiring_position!: string

  @ForeignKey(() => Hr)
  @Column
  hr_id!: string

  @BelongsTo(() => Hr)
  hr: Hr

  @Column
  start_date!: Date

  @Column
  end_date!: Date

  @BelongsToMany(() => ListGame, () => AssessmentListGame)
  listgame: ListGame[]

  @HasMany(() => Result, 'assr_id')
  result!: Result[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Assessment }
