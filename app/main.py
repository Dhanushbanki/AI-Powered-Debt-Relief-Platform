from fastapi.middleware.cors import CORSMiddleware
from app.financial_engine import simulate_debt_timeline
from app.financial_engine import calculate_loan_priority
from app.financial_engine import calculate_financial_health
from app.ai_engine import calculate_settlement
from app.database import SessionLocal
from app import models, schemas
from fastapi import FastAPI

from app.database import Base, engine
import app.models

# Create database tables
Base.metadata.create_all(bind=engine)
print("✅ Database Tables Created Successfully")

app = FastAPI(
    title="FinRelief AI",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to FinRelief AI 🚀"
    }

@app.get("/test-db")
def test_db():
    return {
        "database_status": "Connected Successfully"
    
    }
@app.post("/register")
def register(user: schemas.UserCreate):
    db = SessionLocal()

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password,
        monthly_income=user.monthly_income,
        monthly_expenses=user.monthly_expenses
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }






@app.post("/login")
def login(user: schemas.UserLogin):
    db = SessionLocal()

    existing_user = db.query(models.User).filter(
        models.User.email == user.email,
        models.User.password == user.password
    ).first()

    db.close()

    if existing_user:
        return {
            "message": "Login Successful",
            "user_id": existing_user.id
        }

    return {
        "message": "Invalid Email or Password"
    }
@app.post("/add-loan")
def add_loan(user_id: int, loan: schemas.LoanCreate):
    db = SessionLocal()

    new_loan = models.Loan(
        user_id=user_id,
        lender_name=loan.lender_name,
        outstanding_amount=loan.outstanding_amount,
        interest_rate=loan.interest_rate,
        overdue_months=loan.overdue_months,
        emi=loan.emi
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)
    db.close()

    return {
        "message": "Loan Added Successfully",
        "loan_id": new_loan.id
    }

@app.get("/loans")
def get_loans():
    db = SessionLocal()

    loans = db.query(models.Loan).all()

    db.close()

    return loans

@app.delete("/delete-loan/{loan_id}")
def delete_loan(loan_id: int):
    db = SessionLocal()

    loan = db.query(models.Loan).filter(models.Loan.id == loan_id).first()

    if not loan:
        db.close()
        return {"message": "Loan not found"}

    db.delete(loan)
    db.commit()
    db.close()

    return {"message": "Loan deleted successfully"}

@app.put("/update-profile")
def update_profile(user_id: int, user: schemas.UserCreate):
    db = SessionLocal()

    existing_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not existing_user:
        db.close()
        return {"message": "User not found"}

    existing_user.name = user.name
    existing_user.email = user.email
    existing_user.password = user.password
    existing_user.monthly_income = user.monthly_income
    existing_user.monthly_expenses = user.monthly_expenses

    db.commit()
    db.refresh(existing_user)
    db.close()

    return {
        "message": "Profile Updated Successfully"
    }

@app.get("/dashboard-data")
def get_dashboard_data(user_id: int):
    db = SessionLocal()

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        db.close()
        return {"message": "User not found"}

    loans = db.query(models.Loan).filter(models.Loan.user_id == user_id).all()

    total_loans = len(loans)
    total_outstanding = sum(loan.outstanding_amount for loan in loans)
    total_emi = sum(loan.emi for loan in loans)

    db.close()

    return {
        "user_name": user.name,
        "monthly_income": user.monthly_income,
        "monthly_expenses": user.monthly_expenses,
        "total_loans": total_loans,
        "total_outstanding": total_outstanding,
        "total_emi": total_emi
    }

@app.get("/settlement-predictor")
def settlement_predictor(user_id: int):

    db = SessionLocal()

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        db.close()
        return {"message": "User not found"}

    loans = db.query(models.Loan).filter(models.Loan.user_id == user_id).all()

    result = calculate_settlement(user, loans)

    db.close()

    return result

@app.get("/financial-health")
def financial_health(user_id: int):

    db = SessionLocal()

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        db.close()
        return {"message": "User not found"}

    loans = db.query(models.Loan).filter(models.Loan.user_id == user_id).all()

    result = calculate_financial_health(user, loans)

    db.close()

    return result

@app.get("/ai-negotiation-strategy")
def ai_negotiation_strategy(user_id: int):

    db = SessionLocal()

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        db.close()
        return {"message": "User not found"}

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    total_emi = sum(loan.emi for loan in loans)

    if user.monthly_income > 0:
        emi_ratio = (total_emi / user.monthly_income) * 100
    else:
        emi_ratio = 0

    strategy = calculate_loan_priority(loans, emi_ratio)

    db.close()

    return {
        "user_id": user_id,
        "loan_priority": strategy
    }

@app.get("/generate-negotiation-email/{loan_id}")
def generate_negotiation_email(loan_id: int):

    db = SessionLocal()

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id
    ).first()

    if not loan:
        db.close()
        return {"message": "Loan not found"}

    user = db.query(models.User).filter(
        models.User.id == loan.user_id
    ).first()

    if not user:
        db.close()
        return {
            "message": f"User not found. loan.user_id = {loan.user_id}"
        }

    email = f"""
Subject: Request for Loan Settlement

Dear {loan.lender_name},

I am {user.name}. I am currently facing financial difficulties and would like to request a settlement for my loan.

Loan Details:
Outstanding Amount : ₹{loan.outstanding_amount}
Interest Rate : {loan.interest_rate}%
Monthly EMI : ₹{loan.emi}

I kindly request you to consider my settlement request.

Thank you.

Regards,
{user.name}
"""

    history = models.AIHistory(
        user_id=user.id,
        loan_id=loan.id,
        strategy="Loan Settlement Negotiation",
        email=email
    )

    db.add(history)
    db.commit()

    loan_id_value = loan.id
    email_value = email

    db.close()

    return {
        "loan_id": loan_id_value,
        "email": email_value
    }
@app.get("/ai-history")
def get_ai_history():

    db = SessionLocal()

    history = db.query(models.AIHistory).all()

    db.close()

    return history

@app.get("/debt-timeline")
def debt_timeline(user_id: int):

    db = SessionLocal()

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if not user:
        db.close()
        return {
            "message": "User not found"
        }

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    result = simulate_debt_timeline(user, loans)

    db.close()

    return result