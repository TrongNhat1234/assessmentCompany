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
import AssessmentRepository from '@repositories/assessment.repository'
import { CreateAssessmentDto } from '../../dtos/assessment.dto'
const jwt = require('jsonwebtoken')

@JsonController('/assessments')
@Service()
class AssessmentController extends BaseController {
  constructor(protected assessmentRepository: AssessmentRepository) {
    super()
  }
  @UseBefore(AuthHrMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllAssessmentData = await this.assessmentRepository.getAll()
      return this.setData(findAllAssessmentData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Get('/:ass_id')
  async getbyid(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const ass_id = req.params.ass_id
      const findAssData = await this.assessmentRepository.findByAssId(ass_id)
      return this.setData(findAssData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Post('/create')
  async createassessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateAssessmentDto = req.body
      const ass = await this.assessmentRepository.create(data)
      return this.setData(ass).setMessage('Create assessment successfully').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Delete('/delete/:ass_id')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { ass_id } = req.params
      const findAssData = await this.assessmentRepository.findByAssId(ass_id)
      if (!isEmpty(findAssData)) {
        const ass = await this.assessmentRepository.DeleteByAssId(ass_id)
        return this.setData(ass).setMessage('Success').responseSuccess(res)
      } else {
        return this.setMessage('assid is null').responseSuccess(res)
      }
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default AssessmentController
