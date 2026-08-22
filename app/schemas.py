from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    monthly_income: float = 0
    monthly_expenses: float = 0


class UserLogin(BaseModel):
    email: str
    password: str


class LoanCreate(BaseModel):
    lender_name: str
    outstanding_amount: float
    interest_rate: float
    overdue_months: int
    emi: float


class AIHistoryResponse(BaseModel):
    id: int
    user_id: int
    loan_id: int
    strategy: str
    email: str

    class Config:
        from_attributes = True