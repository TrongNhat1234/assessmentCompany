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
import HrListGameRepository from '@repositories/hrlistgame.repository'
import { CreateHrListGameDto } from '../../dtos/hrlistgame.dto'
const jwt = require('jsonwebtoken')

@JsonController('/hrlistgames')
@Service()
class HrListGameController extends BaseController {
  constructor(protected hrlistgameRepository: HrListGameRepository) {
    super()
  }

  @UseBefore(AuthMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllHrListGameData = await this.hrlistgameRepository.getAll()
      return this.setData(findAllHrListGameData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Get('/hr/:hr_id')
  async getbyid(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const hr_id = req.params.hr_id
      const findHrData = await this.hrlistgameRepository.findByHrId(hr_id)
      return this.setData(findHrData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Get('/game/:game_id')
  async getbygameid(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const game_id = req.params.game_id
      const findHrData = await this.hrlistgameRepository.findByGameId(game_id)
      return this.setData(findHrData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Post('/create')
  async createhrlistgame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateHrListGameDto = req.body
      const hrlg = await this.hrlistgameRepository.create(data)
      return this.setData(hrlg).setMessage('Create hrlistgame successfully').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }
}

export default HrListGameController
