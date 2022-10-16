import { Filter } from '@nc/utils/db';

export interface Expense {
  id: string
  merchant_name: string
  amount_in_cents: string
  currency: string
  user_id: string
  date_created: string
  status: string
}

export interface CleanExpense {
  merchant_name: string
  amount_in_cents: string
  currency: string
  status: string
}

export interface Options {
  page: number
  limit: number
  filter?: Filter
  sort?: string
}
