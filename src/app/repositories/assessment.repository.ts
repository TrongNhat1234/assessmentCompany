import Assessment from '@models/entities/assessment.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { AssessmentRepositoryInterface } from './interfaces/assessment.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class AssessmentRepository
  extends BaseRepository<Assessment>
  implements AssessmentRepositoryInterface<Assessment>
{
  constructor(@ModelContainer(Assessment.tableName) Assessment: ModelCtor<Assessment>) {
    super(Assessment)
  }
  async findByAssId(ass_id: string): Promise<Assessment> {
    console.log(this.model)
    return this.findByCondition({
      where: { ass_id: ass_id },
      raw: true,
    })
  }

  async findByHrId(hr_id: string) {
    return await Assessment.findAll({
      where: { hr_id: hr_id },
      raw: true,
    })
  }

  async findByHrIdAssId(hr_id: string, ass_id: string) {
    return await Assessment.findAll({
      where: { hr_id: hr_id, ass_id: ass_id },
      raw: true,
    })
  }

  async DeleteByAssId(ass_id: string) {
    return Assessment.destroy({ where: { ass_id: ass_id } })
  }
}

export default AssessmentRepository
