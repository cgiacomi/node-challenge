interface User {
  email: string
  userId: string
}

// Extend Express with a custom property on Request
declare namespace Express {
  export interface Request {
    id?: string
    user: User
  }
}
