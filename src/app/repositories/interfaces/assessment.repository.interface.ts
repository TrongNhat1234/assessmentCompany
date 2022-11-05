import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface AssessmentRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByAssId(ass_id: string): Promise<any>
  findByHrId(hr_id: string)
  findByHrIdAssId(hr_id: string, ass_id: string)

  DeleteByAssId(ass_id: string): Promise<any>
}
