import AssessmentListgame from '@models/entities/assessmentlistgame.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { AssessmentListgameRepositoryInterface } from './interfaces/assessmentlistgame.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class AssessmentListgameRepository
  extends BaseRepository<AssessmentListgame>
  implements AssessmentListgameRepositoryInterface<AssessmentListgame>
{
  constructor(
    @ModelContainer(AssessmentListgame.tableName) Assessment: ModelCtor<AssessmentListgame>,
  ) {
    super(AssessmentListgame)
  }
  async findByAssId(ass_id: string) {
    return AssessmentListgame.findAll({
      where: { ass_id: ass_id },
      raw: true,
    })
  }

  async findByAssIdGameId(ass_id: string, game_id: string) {
    return AssessmentListgame.findAll({
      where: { ass_id: ass_id, game_id: game_id },
      raw: true,
    })
  }

  async DeleteByAssId(ass_id: string) {
    return AssessmentListgame.destroy({ where: { ass_id: ass_id } })
  }

  async DeleteByAssGameId(game_id: string, ass_id: string) {
    return AssessmentListgame.destroy({ where: { game_id: game_id, ass_id: ass_id } })
  }
}

export default AssessmentListgameRepository
