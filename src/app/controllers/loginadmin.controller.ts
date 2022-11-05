import { AuthMiddleware } from '../middlewares/auth.middleware'
import { LoginAdmin } from '@models/entities/loginadmin.entity'
import { Request, Response, NextFunction, response } from 'express'
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
import { LoginAdminDto } from './../../dtos/loginadmin.dto'
import LoginAdminRepository from '@repositories/loginadmin.repository'
const jwt = require('jsonwebtoken')
@JsonController('/admins')
@Service()
class LoginAdminController extends BaseController {
  constructor(protected loginadminRepository: LoginAdminRepository) {
    super()
  }

  //create auction
  // @Authorized()
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginAdminDto = req.body
      const data = await this.loginadminRepository.findbylogin(email, password)
      if (data) {
        const data2 = data.id
        const tokens = await this.loginadminRepository.generateTokens(data2)
        return res.json({
          message: 'thanh cong',
          token: tokens,
        })
      } else {
        return this.setMessage('dang nhap that bai').responseSuccess(res)
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('loi server').responseErrors(res)
    }
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const bearer = req.headers.authorization
      const accessToken = bearer.split('Bearer ')[1].trim()
      return this.setMessage('dang xuat thanh cong').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('loi server').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
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

export default LoginAdminController
