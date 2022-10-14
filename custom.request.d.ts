// Extend Express with a custom property on Request
declare namespace Express {
  export interface Request {
    id?: string
  }
}
