def calculate_settlement(outstanding_amount, interest_rate, overdue_months):

    """
    Calculate settlement amount based on overdue months.
    """

    percentage = 60

    if overdue_months >= 6:
        percentage = 50

    elif overdue_months >= 3:
        percentage = 55

    settlement_amount = outstanding_amount * (percentage / 100)

    saving = outstanding_amount - settlement_amount

    risk = "LOW"

    if overdue_months >= 6:
        risk = "HIGH"

    elif overdue_months >= 3:
        risk = "MEDIUM"

    return {

        "risk": risk,

        "settlement_percentage": percentage,

        "settlement_amount": settlement_amount,

        "saving": saving

    }


def calculate_loan_priority(loans, emi_ratio):

    """
    Generate loan priority strategy.
    """

    strategies = []

    for loan in loans:

        priority = "LOW"

        if loan.overdue_months >= 6:
            priority = "HIGH"

        elif loan.overdue_months >= 3:
            priority = "MEDIUM"

        strategies.append({

            "lender": loan.lender_name,

            "priority": priority,

            "outstanding": loan.outstanding_amount,

            "emi": loan.emi,

            "overdue_months": loan.overdue_months

        })

    return strategies