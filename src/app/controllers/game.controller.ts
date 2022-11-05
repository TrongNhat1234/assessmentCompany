import { AuthHrMiddleware } from '../middlewares/authhr.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { AuthTestMiddleware } from '../middlewares/authtest.middleware'

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
import GameRepository from '@repositories/game.repository'
import { format } from 'path'
import { info } from 'console'
const jwt = require('jsonwebtoken')

@JsonController('/games')
@Service()
class GameController extends BaseController {
  constructor(protected gameRepository: GameRepository) {
    super()
  }
  @UseBefore(AuthTestMiddleware)
  @Get('/list')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const listGame = await this.gameRepository.getAll()
      return this.setData(listGame).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @Get('/anwser/:id')
  async getAnwser(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10)
      const listGame = await this.gameRepository.findByIdAnswer(id)
      return this.setData(listGame).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  @UseBefore(AuthTestMiddleware)
  @Get('/list/game02')
  async gettestgamememory2(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const ListGame = []
      for (let i = 1; i <= 25; i++) {
        const a = await this.gameRepository.findByListLevelGame('game02', i)
        const n = Math.floor(Math.random() * a.length)
        ListGame.push(a[n])
      }
      return this.setData(ListGame).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }

  // @Get('/list/game04')
  // async gettestgamelogical(@Req() req: Request, @Res() res: Response, next: NextFunction) {
  //   try {
  //     const level1 = req.body.level1
  //     const level2 = req.body.level2
  //     const listGamelevel1 = await this.gameRepository.getTestGameLevel('game04', 1)
  //     const listGamelevel2 = await this.gameRepository.getTestGameLevel('game04', 2)
  //     const listgame = []
  //     const numbers = []
  //     const numbers2 = []
  //     const numbers3 = 0
  //     const numbers4 = 0

  //     for (let i = 0; i < 10; i++) {
  //       let n = Math.floor(Math.random() * listGamelevel1.length) + 0
  //       let check = numbers.includes(n)

  //       if (check === false) {
  //         numbers.push(n)
  //         listgame.push(listGamelevel1[n])
  //       } else {
  //         while (check === true) {
  //           n = Math.floor(Math.random() * listGamelevel1.length) + 0
  //           check = numbers.includes(n)
  //           if (check === false) {
  //             numbers.push(n)
  //             listgame.push(listGamelevel1[n])
  //           }
  //         }
  //       }

  //       let m = Math.floor(Math.random() * listGamelevel2.length) + 0
  //       let check2 = numbers2.includes(m)

  //       if (check2 === false) {
  //         numbers2.push(m)
  //         listgame.push(listGamelevel2[m])
  //       } else {
  //         while (check2 === true) {
  //           m = Math.floor(Math.random() * listGamelevel2.length) + 0
  //           check2 = numbers2.includes(m)
  //           if (check2 === false) {
  //             numbers2.push(m)
  //             listgame.push(listGamelevel2[m])
  //           }
  //         }
  //       }
  //     }

  //     for (let i = 0; i < 20; i++) {
  //       const a = Math.floor(Math.random() * listgame.length)
  //       const b = Math.floor(Math.random() * listgame.length)
  //       let temp = {}
  //       temp = listgame[a]
  //       listgame[a] = listgame[b]
  //       listgame[b] = temp
  //     }
  //     console.log(listgame.length)

  //     return this.setData(listgame).setMessage('Success').responseSuccess(res)
  //   } catch (error) {
  //     return this.setStack(error.stack).setMessage('Error').responseErrors(res)
  //   }
  // }

  //@UseBefore(AuthTestMiddleware)
  @Get('/list/game04')
  async gettestgamelogical2(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const level1 = req.body.level1
      const level2 = req.body.level2

      const game_id = 'game04'
      const game11 = await this.gameRepository.getTestGameLevel2(game_id, 1, 1)
      const game12 = await this.gameRepository.getTestGameLevel2(game_id, 2, 1)

      const game21 = await this.gameRepository.getTestGameLevel2(game_id, 1, 2)
      const game22 = await this.gameRepository.getTestGameLevel2(game_id, 2, 2)
      const listgame = []
      let num1 = 1

      let num2 = 0
      let num3 = 0

      let num4 = 1
      const numbers3 = []
      const numbers2 = []
      const numbers4 = []
      const numbers5 = []

      while (num1 <= level2) {
        if (num1 <= level2) {
          if (num2 < 10) {
            let n = Math.floor(Math.random() * game21.length) + 0
            let check = numbers3.includes(n)
            if (check === false) {
              numbers3.push(n)
              listgame.push(game21[n])
              num1++
              num2++
            } else {
              while (check === true) {
                n = Math.floor(Math.random() * game21.length) + 0
                check = numbers3.includes(n)
                if (check === false) {
                  num1++
                  num2++
                  numbers3.push(n)
                  listgame.push(game21[n])
                }
              }
            }
          }
        }
        if (level1 % 2 == 1) {
          if (num1 == level2) break
        }

        if (num1 <= level2) {
          if (num3 < 10) {
            let m = Math.floor(Math.random() * game22.length) + 0
            let check2 = numbers2.includes(m)

            if (check2 === false) {
              numbers2.push(m)
              listgame.push(game22[m])
              num1++
              num3++
            } else {
              while (check2 === true) {
                m = Math.floor(Math.random() * game22.length) + 0
                check2 = numbers2.includes(m)
                if (check2 === false) {
                  numbers2.push(m)
                  listgame.push(game22[m])
                  num3++
                  num1++
                }
              }
            }
          }
        }
      }

      while (num4 <= level1) {
        if (num4 <= level1) {
          if (num2 < 10) {
            let n = Math.floor(Math.random() * game11.length) + 0
            let check = numbers4.includes(n)
            if (check === false) {
              numbers4.push(n)
              listgame.push(game11[n])
              num4++
              num2++
            } else {
              while (check === true) {
                n = Math.floor(Math.random() * game11.length) + 0
                check = numbers4.includes(n)
                if (check === false) {
                  num4++
                  num2++
                  numbers4.push(n)
                  listgame.push(game11[n])
                }
              }
            }
          }
        }
        //if (num4 == 5) break

        if (num4 <= level1) {
          if (num3 < 10) {
            let m = Math.floor(Math.random() * game12.length) + 0
            let check2 = numbers5.includes(m)

            if (check2 === false) {
              numbers5.push(m)
              listgame.push(game12[m])
              num4++
              num3++
            } else {
              while (check2 === true) {
                m = Math.floor(Math.random() * game12.length) + 0
                check2 = numbers5.includes(m)
                if (check2 === false) {
                  numbers5.push(m)
                  listgame.push(game12[m])
                  num3++
                  num4++
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < 20; i++) {
        const a = Math.floor(Math.random() * listgame.length)
        const b = Math.floor(Math.random() * listgame.length)
        let temp = {}
        temp = listgame[a]
        listgame[a] = listgame[b]
        listgame[b] = temp
      }

      for (let i = 0; i < 20; i++) {
        console.log(listgame[i].level)
      }

      return this.setData(listgame).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }
}

export default GameController
