import dlt
from pyspark.sql.functions import col, sum


@dlt.table(
    name="bronze_patient_visits",
    comment="Raw hospital patient visit data"
)
def bronze_patient_visits():

    visits_data = [
        (1,1001,201,"2024-03-01","Completed",2),
        (2,1002,202,"2024-03-01","Completed",1),
        (3,1003,203,"2024-03-02","Completed",3),
        (4,1004,204,"2024-03-02","Pending",1),
        (5,1005,206,"2024-03-03","Completed",2),
        (6,1006,205,"2024-03-03","Completed",4),
        (7,1007,207,"2024-03-04","Cancelled",1),
        (8,1008,208,"2024-03-04","Completed",2),
        (9,1009,201,"2024-03-05","Completed",1),
        (10,1010,202,"2024-03-05","Completed",2),
        (11,1011,205,"2024-03-06","Pending",3),
        (12,1012,204,"2024-03-06","Completed",1),
        (13,1013,203,"2024-03-07","Completed",2),
        (14,1014,201,"2024-03-07","Completed",3),
        (15,1015,210,"2024-03-08","Completed",1),
        (16,1016,207,"2024-03-08","Cancelled",2),
        (17,1017,209,"2024-03-09","Completed",4),
        (18,1018,206,"2024-03-09","Completed",2),
        (19,1019,209,"2024-03-10","Completed",3),
        (20,1020,206,"2024-03-10","Pending",2)
    ]

    visits_columns = [
        "visit_id",
        "patient_id",
        "doctor_id",
        "visit_date",
        "visit_status",
        "tests_count"
    ]

    return spark.createDataFrame(
        visits_data,
        visits_columns
    )



@dlt.table(
    name="silver_patient_visits",
    comment="Cleaned patient visits with total bill"
)
def silver_patient_visits():

    df = dlt.read("bronze_patient_visits")

    return (
        df
        .filter(col("visit_status").isNotNull())
        .filter(col("tests_count") > 0)
        .withColumn(
            "total_bill",
            col("tests_count") * 500
        )
    )



@dlt.table(
    name="gold_city_revenue",
    comment="Total revenue grouped by city"
)
def gold_city_revenue():

    patients_data = [
        (1001,"Aarav Khan","Hyderabad"),
        (1002,"Priya Reddy","Bengaluru"),
        (1003,"Rahul Mehta","Mumbai"),
        (1004,"Sneha Kapoor","Delhi"),
        (1005,"Kiran Patel","Ahmedabad"),
        (1006,"Ananya Das","Kolkata"),
        (1007,"Vikram Singh","Chennai"),
        (1008,"Meera Nair","Kochi"),
        (1009,"Farhan Ali","Hyderabad"),
        (1010,"Divya Menon","Bengaluru"),
        (1011,"Arjun Iyer","Chennai"),
        (1012,"Neha Gupta","Delhi"),
        (1013,"Sanjay Rao","Mumbai"),
        (1014,"Kavya Sharma","Hyderabad"),
        (1015,"Nikhil Verma","Pune"),
        (1016,"Ayesha Khan","Kolkata"),
        (1017,"Manish Yadav","Lucknow"),
        (1018,"Pooja Shah","Ahmedabad"),
        (1019,"Rohan Nair","Kochi"),
        (1020,"Lakshmi Rao","Chennai")
    ]

    patients_columns = [
        "patient_id",
        "patient_name",
        "city"
    ]

    patients_df = spark.createDataFrame(
        patients_data,
        patients_columns
    )

    silver_df = dlt.read("silver_patient_visits")

    final_df = silver_df.join(
        patients_df,
        "patient_id"
    )

    return final_df.groupBy("city") \
        .agg(
            sum("total_bill").alias("total_revenue")
        )


@dlt.table(
    name="gold_specialization_revenue",
    comment="Total revenue grouped by specialization"
)
def gold_specialization_revenue():

    doctors_data = [
        (201,"Cardiology"),
        (202,"Dermatology"),
        (203,"Orthopedics"),
        (204,"Pediatrics"),
        (205,"Neurology"),
        (206,"Cardiology"),
        (207,"Dermatology"),
        (208,"Orthopedics"),
        (209,"Neurology"),
        (210,"General Medicine")
    ]

    doctors_columns = [
        "doctor_id",
        "specialization"
    ]

    doctors_df = spark.createDataFrame(
        doctors_data,
        doctors_columns
    )

    silver_df = dlt.read("silver_patient_visits")

    final_df = silver_df.join(
        doctors_df,
        "doctor_id"
    )

    return final_df.groupBy("specialization") \
        .agg(
            sum("total_bill").alias("total_revenue")
        )