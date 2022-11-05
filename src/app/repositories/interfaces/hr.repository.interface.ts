import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface HrRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByHrId(hr_id: string): Promise<any>
  findByHremail(email: string): Promise<any>
}
