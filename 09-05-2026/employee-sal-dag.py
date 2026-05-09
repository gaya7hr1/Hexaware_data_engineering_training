from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime


def create_employee_file():
    with open("/tmp/employees.txt", "w") as f:
        f.write(
            "Rahul,45000\n"
            "Sneha,52000\n"
            "Amit,61000\n"
            "Priya,47000\n"
            "Kiran,39000"
        )


def read_employee_data():
    with open("/tmp/employees.txt", "r") as f:
        data = f.readlines()

    for i in data:
        print(i.strip())


def calculate_salary_expense():
    total = 0

    with open("/tmp/employees.txt", "r") as f:
        data = f.readlines()

    for i in data:
        name, salary = i.strip().split(",")
        total += int(salary)

    print(f"Total Salary Expense = {total}")


def find_highest_salary():
    high = 0
    emp = ""

    with open("/tmp/employees.txt", "r") as f:
        for i in f:
            name, salary = i.strip().split(",")
            salary = int(salary)

            if salary > high:
                high = salary
                emp = name

    print(f"Highest Salary = {high}")
    print(f"Employee = {emp}")


def generate_salary_report():
    total = 0
    count = 0

    with open("/tmp/employees.txt", "r") as f:
        for i in f:
            name, salary = i.strip().split(",")
            total += int(salary)
            count += 1

    with open("/tmp/salary_report.txt", "w") as f:
        f.write(
            "Employee Salary Report\n"
            f"Total Employees = {count}\n"
            f"Total Salary Expense = {total}\n"
            "Status = Processed Successfully"
        )


with DAG(
    dag_id="employee_salary_processing",
    start_date=datetime(2025, 1, 1),
    schedule=None,
    catchup=False
) as dag:

    t1 = PythonOperator(
        task_id="create_employee_file",
        python_callable=create_employee_file
    )

    t2 = PythonOperator(
        task_id="read_employee_data",
        python_callable=read_employee_data
    )

    t3 = PythonOperator(
        task_id="calculate_salary_expense",
        python_callable=calculate_salary_expense
    )

    t4 = PythonOperator(
        task_id="find_highest_salary",
        python_callable=find_highest_salary
    )

    t5 = PythonOperator(
        task_id="generate_salary_report",
        python_callable=generate_salary_report
    )

    t1 >> t2 >> t3 >> t4 >> t5