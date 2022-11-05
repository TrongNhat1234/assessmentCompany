import { AuthRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessToken } from '@interfaces/token.interface'
import { verifyToken } from '@utils/token'
import LoginAdmin from '@models/entities/loginadmin.entity'
const jwt = require('jsonwebtoken')

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised1'))
    }

    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const payload = (await jwt.verify(accessToken, 'mk')) as IAccessToken
      console.log(payload)
      const loginadmin = await LoginAdmin.findOne({
        where: {
          id: payload.id,
        },
        raw: true,
      })

      if (!loginadmin) {
        return next(new HttpException(401, 'Unauthorised'))
      }

      request.loginadmin = loginadmin

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
