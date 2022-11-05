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
import HrRepository from '@repositories/hr.repository'
import { CreateHrDto, LoginHrDto } from '../../dtos/hr.dto'
const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt'
@JsonController('/hrs')
@Service()
class HrController extends BaseController {
  constructor(protected hrRepository: HrRepository) {
    super()
  }
  @UseBefore(AuthMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllHrData = await this.hrRepository.getAll()
      return this.setData(findAllHrData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Get('/:hr_id')
  async getbyid(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const hr_id = req.params.hr_id
      const findHrData = await this.hrRepository.findByHrId(hr_id)
      return this.setData(findHrData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @Post('/login')
  async loginhr(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginHrDto = req.body
      const data = await this.hrRepository.findByHremail(email)
      if (data) {
        const a: string = data.password
        const res1 = bcrypt.compareSync(password, a)
        if (res1) {
          const data2 = data.hr_id
          const tokens = await this.hrRepository.generateTokens(data2)
          return res.json({
            message: 'thanh cong',
            token: tokens,
          })
        } else {
          return this.setMessage('dang nhap that bai').responseSuccess(res)
        }
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('loi server').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Post('/create')
  async createhr(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const password: string = req.body.password

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      const data: CreateHrDto = {
        hr_id: req.body.hr_id,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hash,
      }
      console.log(data)
      const data1 = await this.hrRepository.create(data)
      return this.setData(data1).setMessage('Create hr successfully').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }
  @UseBefore(AuthHrMiddleware)
  @Get('/private')
  async check(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    const authorizationClient = req.headers.authorization
    const token = authorizationClient && authorizationClient.split('Bearer ')[1]

    if (!token) return res.sendStatus(401)

    try {
      const data = jwt.verify(token, 'mk')
      if (data) {
        return this.setMessage('dã dang nhap').responseSuccess(res)
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('ban phai dang nhap').responseErrors(res)
    }
  }
}

export default HrController
