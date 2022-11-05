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

import Assessment from './assessment.entity'

@Table({
  tableName: 'results',
})
export default class Result extends Model<Result> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  email!: string
  @Column
  avarage_aptitude!: number
  @Column
  visual!: number
  @Column
  memory!: number
  @Column
  verbal!: number
  @Column
  logical!: number
  @Column
  numerical!: number
  @Column
  personality!: number

  @ForeignKey(() => Assessment)
  @Column
  assr_id!: number

  @BelongsTo(() => Assessment, 'assr_id')
  assessment!: Assessment

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Result }
