import { AuthTestRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessHrToken, IAccessToken } from '@interfaces/token.interface'
import { verifyToken } from '@utils/token'
import Result from '@models/entities/result.entity'
const jwt = require('jsonwebtoken')

@Service()
export class AuthTestMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthTestRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised1'))
    }

    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const payload = (await jwt.verify(accessToken, 'mk')) as IAccessToken
      console.log(payload.id)

      const result = await Result.findOne({
        where: {
          id: payload.id,
        },
        raw: true,
      })
      console.log(result)

      if (!result) {
        return next(new HttpException(401, 'Unauthorised2'))
      }

      request.result = result

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
