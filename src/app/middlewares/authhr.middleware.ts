import { AuthHrRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessHrToken, IAccessToken } from '@interfaces/token.interface'
import { verifyToken } from '@utils/token'
import Hr from '@models/entities/hr.entity'
const jwt = require('jsonwebtoken')

@Service()
export class AuthHrMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthHrRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised1'))
    }

    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const payload = (await jwt.verify(accessToken, 'mk')) as IAccessHrToken

      const hr = await Hr.findOne({
        where: {
          hr_id: payload.id,
        },
        raw: true,
      })

      if (!hr) {
        return next(new HttpException(401, 'Unauthorised2'))
      }

      request.hr = hr

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
