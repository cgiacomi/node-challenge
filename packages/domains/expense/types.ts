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

export interface Filter {
  merchantName: string
  currency: string
  status: string
}
