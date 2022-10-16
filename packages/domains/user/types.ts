export interface User {
  id: string
  first_name: string
  last_name: string
  company_name: string
  ssn: string
}

export interface CleanUser {
  first_name: string
  last_name: string
  company_name: string
}
