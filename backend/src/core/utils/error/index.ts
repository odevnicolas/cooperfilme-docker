import { HttpStatus } from "@nestjs/common"

export class Warning {
  public readonly message: string
  public readonly code: number
  public readonly error?: Error

  constructor(message: string, code = HttpStatus.INTERNAL_SERVER_ERROR, error?: Error) {
    this.code = code
    this.message = message
    this.error = error
  }
}