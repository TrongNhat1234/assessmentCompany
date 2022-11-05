import { HrListGame } from '@models/entities/hrlistgame.entity'
import { ModelCtor } from 'sequelize-typescript'
import Result from '@models/entities/result.entity'
import DB from '@models/index'
import LoginAdmin from '@models/entities/loginadmin.entity'
import Game from '@models/entities/game.entity'
import Hr from '@models/entities/hr.entity'
import Assessment from '@models/entities/assessment.entity'
import AssessmentListgame from '@models/entities/assessmentlistgame.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case Game.tableName:
      item = DB.sequelize.model(Game)
      break
    case LoginAdmin.tableName:
      item = DB.sequelize.model(LoginAdmin)
      break
    case Hr.tableName:
      item = DB.sequelize.model(Hr)
      break
    case HrListGame.tableName:
      item = DB.sequelize.model(HrListGame)
      break
    case Assessment.tableName:
      item = DB.sequelize.model(Assessment)
      break
    case AssessmentListgame.tableName:
      item = DB.sequelize.model(AssessmentListgame)
      break
    case Result.tableName:
      item = DB.sequelize.model(Result)
      break
    default:
      item = undefined
      break
  }
  return item
}
