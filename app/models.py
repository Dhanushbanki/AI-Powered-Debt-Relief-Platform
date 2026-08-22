from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    monthly_income = Column(Float, default=0)
    monthly_expenses = Column(Float, default=0)


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lender_name = Column(String, nullable=False)
    outstanding_amount = Column(Float, default=0)
    interest_rate = Column(Float, default=0)
    overdue_months = Column(Integer, default=0)
    emi = Column(Float, default=0)

class AIHistory(Base):
    __tablename__ = "ai_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    loan_id = Column(Integer, ForeignKey("loans.id"), nullable=False)
    strategy = Column(Text, nullable=False)
    email = Column(Text, nullable=False)