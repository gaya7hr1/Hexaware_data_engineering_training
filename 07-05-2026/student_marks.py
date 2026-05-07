from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def create_marks_file():
    with open("/tmp/student_marks.txt", "w") as f:
        f.write("Math,80\n")
        f.write("Science,75\n")
        f.write("English,90\n")
        f.write("Python,95\n")

def read_marks_file():
    with open("/tmp/student_marks.txt", "r") as f:
        lines = f.readlines()
        for line in lines:
            print(line.strip())

def calculate_total():
    total = 0
    with open("/tmp/student_marks.txt", "r") as f:
        for line in f:
            total += int(line.strip().split(",")[1])
    print(f"Total Marks = {total}")

def percentage_calculation():
    total = 0
    with open("/tmp/student_marks.txt", "r") as f:
        for line in f:
            total += int(line.strip().split(",")[1])

    percentage = total / 4
    print(f"Percentage = {percentage}")

def generate_result():
    total = 0
    with open("/tmp/student_marks.txt", "r") as f:
        for line in f:
            total += int(line.strip().split(",")[1])

    result = "PASS" if total >= 140 else "FAIL"

    with open("/tmp/result.txt", "w") as f:
        f.write("Student Result Summary\n")
        f.write(f"Total Marks = {total}\n")
        f.write(f"Result = {result}")

with DAG(
    dag_id="student_marks_workflow_dag",
    start_date=datetime(2025, 1, 1),
    schedule=None,
    catchup=False
) as dag:

    create_marks_file_task = PythonOperator(
        task_id="create_marks_file",
        python_callable=create_marks_file
    )

    read_marks_file_task = PythonOperator(
        task_id="read_marks_file",
        python_callable=read_marks_file
    )

    calculate_total_task = PythonOperator(
        task_id="calculate_total",
        python_callable=calculate_total
    )

    percentage_calculation_task = PythonOperator(
        task_id="percentage_calculation",
        python_callable=percentage_calculation
    )

    generate_result_task = PythonOperator(
        task_id="generate_result",
        python_callable=generate_result
    )

    create_marks_file_task >> read_marks_file_task >> calculate_total_task >> percentage_calculation_task >> generate_result_task