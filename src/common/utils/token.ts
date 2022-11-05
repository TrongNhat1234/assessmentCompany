import LoginAdmin from '@models/entities/loginadmin.entity'
import { IAccessToken, IRefreshToken } from '@interfaces/token.interface'
import jwt from 'jsonwebtoken'
import { env } from '@env'

const createAccessToken = (loginadmin: LoginAdmin): string => {
  return jwt.sign(
    {
      id: loginadmin.id,
    },

    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '3h',
    },
  )
}

const createRefreshToken = (loginadmin: LoginAdmin): string => {
  return jwt.sign(
    {
      id: loginadmin.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '1d',
    },
  )
}

const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | IAccessToken | IRefreshToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload as IAccessToken | IRefreshToken)
    })
  })
}

export { createAccessToken, createRefreshToken, verifyToken }
