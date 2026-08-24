# AI-Powered Debt Relief & Financial Recovery Platform

An AI-powered financial assistance platform designed to help users understand their debt situation, analyze financial health, prioritize loans, estimate settlement opportunities, and prepare debt negotiation strategies.

## 🚀 Features

- User registration and login
- Loan management
- Financial health analysis
- EMI ratio and debt analysis
- Loan priority analysis
- Debt repayment timeline simulation
- Settlement prediction
- AI-assisted negotiation strategy
- Negotiation email generation
- Interactive dashboard
- Responsive web interface

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

### AI & Financial Logic
- AI-assisted financial analysis
- Debt settlement prediction
- Loan prioritization
- Negotiation strategy generation

## 📁 Project Structure

AI-Powered-Debt-Relief-Platform/
│
├── app/
│   ├── ai_engine.py
│   ├── database.py
│   ├── financial_engine.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── css/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── requirements.txt
└── README.md

## ⚙️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/Dhanushbanki/AI-Powered-Debt-Relief-Platform.git

cd AI-Powered-Debt-Relief-Platform

### 2. Backend Setup

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000

API Documentation:

http://127.0.0.1:8000/docs

### 3. Frontend Setup

Open another terminal:

cd frontend

npm install

npm run dev

## 📊 Core Modules

### Financial Health Analysis

Analyzes income, expenses, EMI obligations, outstanding debt, EMI ratio, and financial stress level.

### Loan Priority Analysis

Evaluates loans based on overdue duration, interest rate, and EMI burden to determine repayment priority.

### Settlement Predictor

Provides an estimated settlement amount and potential savings based on the user's debt situation.

### AI Negotiation Strategy

Generates loan-specific priorities and assists users in preparing negotiation strategies.

### Negotiation Email Generator

Generates a structured loan settlement request email based on the user's loan and financial information.

## 🔐 Security

Sensitive credentials and API keys should be stored in environment variables and should never be committed to the repository.

## 🔮 Future Enhancements

- Secure authentication with JWT
- Advanced AI-powered financial recommendations
- Real-time lender communication
- Improved debt repayment forecasting
- Cloud database integration
- Docker and cloud deployment
- Enhanced analytics and visualization

## 👨‍💻 Author

Dhanush Banki

GitHub: https://github.com/Dhanushbanki
