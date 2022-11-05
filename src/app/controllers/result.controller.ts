import { isEmpty } from './../../common/utils/util'
import { AuthHrMiddleware } from '../middlewares/authhr.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { AuthTestMiddleware } from '../middlewares/authtest.middleware'
const { Op } = require('sequelize')
import Result from '@models/entities/result.entity'
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
import ResultRepository from '@repositories/result.repository'
import { IAccessHrToken, IAccessToken } from '@interfaces/token.interface'
import { CreateResultDto, UpdateResultDto, LoginResultDto } from '../../dtos/result.dto'
import Assessment from '@models/entities/assessment.entity'
import ListGame from '@models/entities/listgame.entity'

import { isArray } from 'class-validator'
import { info } from 'console'
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const XLSX = require('xlsx')
import AssessmentRepository from '@repositories/assessment.repository'
import AssessmentListGameRepository from '@repositories/assessmentlistgame.repository'
import AssessmentListGame from '@models/entities/assessmentlistgame.entity'

@JsonController('/results')
@Service()
class ResultController extends BaseController {
  constructor(protected resultRepository: ResultRepository) {
    super()
  }

  //view all for admins
  @UseBefore(AuthMiddleware)
  @Get('/export/excel')
  async ExportEx(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllResult1 = await this.resultRepository.getAll()

      const convertJsonToExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(findAllResult1)
        const workBook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workBook, workSheet, 'findAllResult')
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })

        // Binary string
        XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })

        XLSX.writeFile(workBook, 'ResultAll.xlsx')
      }
      convertJsonToExcel()
      return this.setData(findAllResult1).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllResult1 = await this.resultRepository.getAll()
      return this.setData(findAllResult1).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Get('/listhr')
  async getAllHr(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const hr_id = await jwt.verify(accessToken, 'mk').id
      const listAssHr = await new AssessmentRepository(Assessment).findByHrId(hr_id)
      const listAss_idHr = []
      for (let i = 0; i < listAssHr.length; i++) {
        listAss_idHr[i] = listAssHr[i].ass_id
      }
      const findAllResultHr = await Result.findAll({
        where: {
          assr_id: {
            [Op.or]: listAss_idHr,
          },
        },
      })

      return this.setData(findAllResultHr).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthTestMiddleware)
  @Get('/listgame')
  async getlistgame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const resultid = await jwt.verify(accessToken, 'mk').id
      const assid = await (await this.resultRepository.findById(resultid)).assr_id.toString()
      console.log(assid)
      const listGame = await new AssessmentListGameRepository(AssessmentListGame).findByAssId(assid)
      console.log(listGame)
      const listGameId = []
      for (let i = 0; i < listGame.length; i++) {
        listGameId[i] = listGame[i].game_id
      }
      if (!isEmpty(listGameId)) {
        const findAllListGameCandidate = await ListGame.findAll({
          where: {
            game_id: {
              [Op.or]: listGameId,
            },
          },
        })

        return this.setData(findAllListGameCandidate).setMessage('Success').responseSuccess(res)
      }
      return this.setMessage('assessment no game').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthHrMiddleware)
  @Post('/create')
  async create(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    console.log(req.body)

    const email: string = req.body.email
    const assr_id: string = req.body.assr_id
    const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
    const hr_id = await jwt.verify(accessToken, 'mk').id

    try {
      const assid = await new AssessmentRepository(Assessment).findByHrIdAssId(hr_id, assr_id)
      if (!isEmpty(assid)) {
        const pass = await Result.findAll({ where: { email: email, assr_id: assr_id } })
        console.log(isEmpty(pass))
        if (isEmpty(pass)) {
          // create reusable transporter object using the default SMTP transport
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nhat148764@nuce.edu.vn',
              pass: 'plpssonxnhoukttm',
            },
          })

          const mailOptions = {
            from: 'nhat148764@nuce.edu.vn',
            to: `${email}`,
            subject: 'Click on the link to do the assignment. use this same email to login',
            text: 'http://localhost:3000/api/results/test_login/' + assr_id,
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })

          const data: CreateResultDto = req.body
          const result = await this.resultRepository.create(data)
          return this.setData(result).setMessage('Create result successfully').responseSuccess(res)
        } else {
          return this.setMessage('Email already exists ').responseSuccess(res)
        }
      } else {
        return this.setMessage('assid id null ').responseSuccess(res)
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }
  @UseBefore(AuthHrMiddleware)
  @Put('/update')
  async update(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    let sum = 0
    let temp = 0
    const check = function (a, b) {
      if (a) {
        sum = sum + parseInt(a, 10)
        temp++
      } else {
        if (b) {
          sum = sum + b
          temp++
        }
      }
    }

    const check2 = function (a) {
      if (a) {
        sum = sum + parseInt(a, 10)
        temp++
      }
    }
    try {
      const data3 = await this.resultRepository.findById(req.body.id)
      if (data3) {
        if (
          data3.visual == null &&
          data3.personality == null &&
          data3.numerical == null &&
          data3.logical == null &&
          data3.verbal == null &&
          data3.memory == null
        ) {
          check2(req.body.visual)
          check2(req.body.personality)
          check2(req.body.numerical)
          check2(req.body.logical)
          check2(req.body.verbal)
          check2(req.body.memory)
        } else {
          check(req.body.visual, data3.visual)
          check(req.body.memory, data3.memory)
          check(req.body.verbal, data3.verbal)
          check(req.body.logical, data3.logical)
          check(req.body.numerical, data3.numerical)
          check(req.body.personality, data3.personality)
        }
        console.log(sum)
        console.log(temp)
        const avarage_aptitude = sum / temp
        console.log(avarage_aptitude)

        const data: UpdateResultDto = req.body
        const result = await this.resultRepository.update(
          {
            avarage_aptitude: avarage_aptitude,
            visual: data.visual,
            memory: data.memory,
            verbal: data.verbal,
            logical: data.logical,
            numerical: data.numerical,
            personality: data.personality,
          },
          {
            where: {
              id: data.id,
            },
          },
        )
        return this.setData(result).setMessage('Success').responseSuccess(res)
      } else {
        return this.setMessage('id is null').responseSuccess(res)
      }
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Post('/test_login/:ass_id')
  async logintest(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email
      const ass_id = req.params.ass_id
      console.log(email, ass_id)
      const data = await this.resultRepository.findByLoginTest(email, ass_id)
      console.log(data)
      if (data) {
        const data2 = data.id
        const tokens = await this.resultRepository.generateTokens(data2)
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

  @UseBefore(AuthTestMiddleware)
  @Post('/private')
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

export default ResultController
