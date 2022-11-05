import { isEmpty } from './../../common/utils/util'
import { AuthHrMiddleware } from '../middlewares/authhr.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'

import { Request, Response, NextFunction } from 'express'
import {
  Authorized,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { Service, Inject } from 'typedi'
import { BaseController } from './base.controller'
import { INTEGER } from 'sequelize'
import AssessmentListgameRepository from '@repositories/assessmentlistgame.repository'
import { CreateAssessmentListgameDto } from '../../dtos/assessmentlistgame.dto'
import { IAccessHrToken, IAccessToken } from '@interfaces/token.interface'
import HrListGameRepository from '@repositories/hrlistgame.repository'
import HrListGame from '@models/entities/hrlistgame.entity'
import AssessmentRepository from '@repositories/assessment.repository'
import Assessment from '@models/entities/assessment.entity'
import { isArray } from 'class-validator'
const jwt = require('jsonwebtoken')

@JsonController('/assessmentlistgames')
@Service()
class AssessmentListgameController extends BaseController {
  constructor(protected assessmentlistgameRepository: AssessmentListgameRepository) {
    super()
  }
  @UseBefore(AuthHrMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllAssessmentlistgameData = await this.assessmentlistgameRepository.getAll()
      return this.setData(findAllAssessmentlistgameData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Get('/:ass_id')
  async getbyid(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const ass_id = req.params.ass_id
      const findAsslistgameData = await this.assessmentlistgameRepository.findByAssId(ass_id)
      return this.setData(findAsslistgameData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Post('/create')
  async createassessmentlistgame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const ass_id = req.body.ass_id
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const payload = (await jwt.verify(accessToken, 'mk')) as IAccessHrToken
      const game_id: string = req.body.game_id
      const hrls = await new HrListGameRepository(HrListGame).findByHrGameId(payload.id, game_id)
      const assid = await new AssessmentRepository(Assessment).findByHrIdAssId(payload.id, ass_id)
      if (!isEmpty(hrls) && !isEmpty(assid)) {
        const data: CreateAssessmentListgameDto = req.body
        const asslg = await this.assessmentlistgameRepository.create(data)
        return this.setData(asslg)
          .setMessage('Create assessment listgame successfully')
          .responseSuccess(res)
      } else {
        return this.setMessage(
          'this game is not selected OR Assessment permission denied',
        ).responseSuccess(res)
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Delete('/delete/:ass_id')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { ass_id } = req.params
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const payload = (await jwt.verify(accessToken, 'mk')) as IAccessHrToken
      const assid = await new AssessmentRepository(Assessment).findByHrIdAssId(payload.id, ass_id)
      const findAsslistgameData = await this.assessmentlistgameRepository.findByAssId(ass_id)
      if (!isEmpty(assid) && !isEmpty(findAsslistgameData)) {
        const asslg = await this.assessmentlistgameRepository.DeleteByAssId(ass_id)
        return this.setData(asslg).setMessage('Success').responseSuccess(res)
      } else {
        return this.setMessage('assid permission denied orr assid is null').responseSuccess(res)
      }
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Delete('/delete/:ass_id/:game_id')
  async deleteAssGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { ass_id, game_id } = req.params
      const findAssGamelistgameData = await this.assessmentlistgameRepository.findByAssIdGameId(
        ass_id,
        game_id,
      )
      if (!isEmpty(findAssGamelistgameData)) {
        const asslg = await this.assessmentlistgameRepository.DeleteByAssGameId(game_id, ass_id)
        return this.setData(asslg).setMessage('Success').responseSuccess(res)
      } else {
        return this.setMessage('assessment listgame is null').responseSuccess(res)
      }
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default AssessmentListgameController
