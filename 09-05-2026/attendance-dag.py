from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime


def create_attendance_file():
    with open("/tmp/attendance.txt", "w") as f:
        f.write(
            "Aarav,Present\n"
            "Priya,Present\n"
            "Rahul,Absent\n"
            "Sneha,Present\n"
            "Kiran,Absent\n"
            "Ananya,Present\n"
            "Vikram,Present\n"
            "Meera,Absent\n"
            "Farhan,Present\n"
            "Divya,Present"
        )


def read_attendance_file():
    with open("/tmp/attendance.txt", "r") as f:
        data = f.readlines()

    for i in data:
        print(i.strip())


def count_total_students():
    total = 0

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            total += 1

    print(f"Total Students = {total}")


def count_present_students():
    present = 0

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            name, status = i.strip().split(",")

            if status == "Present":
                present += 1

    print(f"Present Students = {present}")


def count_absent_students():
    absent = 0

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            name, status = i.strip().split(",")

            if status == "Absent":
                absent += 1

    print(f"Absent Students = {absent}")


def calculate_attendance_percentage():
    total = 0
    present = 0

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            total += 1

            name, status = i.strip().split(",")

            if status == "Present":
                present += 1

    per = (present / total) * 100

    print(f"Attendance Percentage = {per}%")


def list_absent_students():
    print("Absent Students List")

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            name, status = i.strip().split(",")

            if status == "Absent":
                print(name)


def generate_attendance_report():
    total = 0
    present = 0
    absent = 0

    with open("/tmp/attendance.txt", "r") as f:
        for i in f:
            total += 1

            name, status = i.strip().split(",")

            if status == "Present":
                present += 1
            else:
                absent += 1

    per = (present / total) * 100

    if per >= 75:
        status = "Good"
    else:
        status = "Needs Improvement"

    with open("/tmp/attendance_report.txt", "w") as f:
        f.write(
            "Daily Attendance Report\n"
            f"Total Students = {total}\n"
            f"Present Students = {present}\n"
            f"Absent Students = {absent}\n"
            f"Attendance Percentage = {per}%\n"
            f"Status = {status}"
        )


with DAG(
    dag_id="daily_attendance_processing",
    start_date=datetime(2025, 1, 1),
    schedule=None,
    catchup=False
) as dag:

    t1 = PythonOperator(
        task_id="create_attendance_file",
        python_callable=create_attendance_file
    )

    t2 = PythonOperator(
        task_id="read_attendance_file",
        python_callable=read_attendance_file
    )

    t3 = PythonOperator(
        task_id="count_total_students",
        python_callable=count_total_students
    )

    t4 = PythonOperator(
        task_id="count_present_students",
        python_callable=count_present_students
    )

    t5 = PythonOperator(
        task_id="count_absent_students",
        python_callable=count_absent_students
    )

    t6 = PythonOperator(
        task_id="calculate_attendance_percentage",
        python_callable=calculate_attendance_percentage
    )

    t7 = PythonOperator(
        task_id="list_absent_students",
        python_callable=list_absent_students
    )

    t8 = PythonOperator(
        task_id="generate_attendance_report",
        python_callable=generate_attendance_report
    )

    t1 >> t2 >> t3 >> t4 >> t5 >> t6 >> t7 >> t8