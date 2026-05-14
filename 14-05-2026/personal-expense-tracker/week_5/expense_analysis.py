import pandas as pd
import numpy as np

print("Pipeline Started")

# load dataset
df = pd.read_csv("expenses_cleaned.csv")

# convert columns
df['expense_date'] = pd.to_datetime(df['expense_date'])
df['month'] = df['expense_date'].dt.strftime('%Y-%m')
df['amount'] = df['amount'].astype(float)

print("Dataset Loaded Successfully")

# category wise spending
category_breakdown = df.groupby(
    ['user_id', 'user_name', 'month', 'category']
)['amount'].sum().reset_index()

print("\nCategory Breakdown")
print(category_breakdown)

# monthly report
monthly_report = df.groupby(
    ['user_id', 'user_name', 'month']
)['amount'].agg(
    total_spending='sum',
    total_transactions='count',
    average_transaction='mean'
).reset_index()

# savings calculation
monthly_income = 50000

monthly_report['estimated_savings'] = (
    monthly_income - monthly_report['total_spending']
)

# alerts
monthly_report['alert'] = np.where(
    monthly_report['total_spending'] > 5000,
    'HIGH SPENDING ALERT',
    'NORMAL'
)

print("\nMonthly Expense Report")
print(monthly_report)

# spending spikes
monthly_report['previous_spending'] = (
    monthly_report.groupby('user_id')['total_spending'].shift(1)
)

monthly_report['spending_change_percent'] = (
    (monthly_report['total_spending'] -
     monthly_report['previous_spending'])
    /
    monthly_report['previous_spending']
) * 100

spikes = monthly_report[
    monthly_report['spending_change_percent'] > 20
]

print("\nSpending Spikes")
print(spikes)

# save reports
monthly_report.to_csv("monthly_summary.csv")
category_breakdown.to_csv("category_breakdown.csv")

print("\nReports Generated Successfully")
print("Pipeline Completed")