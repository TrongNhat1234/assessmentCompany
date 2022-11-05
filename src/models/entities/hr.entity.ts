import {
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
import { HrListGame } from './hrlistgame.entity'
import { Assessment } from './assessment.entity'

@Table({
  tableName: 'hrs',
})
export default class Hr extends Model<Hr> {
  @PrimaryKey
  @Column
  hr_id!: string

  @Column
  name!: string

  @Column
  role!: string

  @Column
  email!: string

  @Column
  password!: string

  @HasMany(() => Assessment)
  assessments: Assessment[]

  @BelongsToMany(() => ListGame, () => HrListGame)
  listgame: ListGame[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Hr }
