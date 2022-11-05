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
import Assessment from './assessment.entity'

@Table({
  tableName: 'assessmentlistgames',
})
export default class AssessmentListGame extends Model<AssessmentListGame> {
  @ForeignKey(() => Assessment)
  @Column
  ass_id: string

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

export { AssessmentListGame }
