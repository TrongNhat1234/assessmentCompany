import { LoginAdmin } from '@models/entities/loginadmin.entity'
import { Hr } from '@models/entities/hr.entity'
import { Result } from '@models/entities/result.entity'

import { Request, Response } from 'express'

export interface ApiResponse {
  status: boolean
  code: number
  data: any
  message: string
  stack: string
}

export interface AuthRequest extends Request {
  loginadmin: LoginAdmin
}
export interface AuthHrRequest extends Request {
  hr: Hr
}

export interface AuthTestRequest extends Request {
  result: Result
}
