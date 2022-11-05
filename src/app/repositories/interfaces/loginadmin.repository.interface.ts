import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface LoginAdminRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findbylogin(email: string, password: string): Promise<M>
}
