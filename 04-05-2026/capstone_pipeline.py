
import dlt
from pyspark.sql.functions import col, sum

@dlt.table(
    name="bronze_patient_visits",
    comment="Raw patient visit data"
)
def bronze_patient_visits():
    raw_data = [
        (101,"Arjun Reddy","Hyderabad","Cardiology",5000,1),
        (102,"Sneha Kapoor","Delhi","Orthopedics",3000,2),
        (103,"Rahul Sharma","Mumbai","Dermatology",1500,1),
        (104,"Priya Nair","Bangalore","Cardiology",5000,2),
        (105,"Vikram Singh","Chennai","Neurology",7000,1),
        (106,"Ananya Das","Kolkata","Orthopedics",3000,3),
        (107,"Karan Patel","Ahmedabad","Cardiology",5000,1),
        (108,"Meera Iyer","Bangalore","Dermatology",1500,2)
    ]

    cols = [
        "visit_id","patient_name","city",
        "department","consultation_fee","tests_count"
    ]

    return spark.createDataFrame(raw_data, cols)

@dlt.table(
    name="silver_patient_visits",
    comment="Transformed data with total_bill"
)
@dlt.expect("valid_fee", "consultation_fee > 0")
def silver_patient_visits():
    bronze_df = dlt.read("bronze_patient_visits")

    transformed_df = bronze_df.withColumn(
        "total_bill",
        col("consultation_fee") + col("tests_count") * 500
    )

    return transformed_df


@dlt.table(
    name="gold_department_revenue",
    comment="Revenue aggregated by department"
)
def gold_department_revenue():
    silver_df = dlt.read("silver_patient_visits")

    agg_df = silver_df.groupBy("department") \
        .agg(sum("total_bill").alias("total_revenue"))

    return agg_df


@dlt.table(
    name="incremental_patient_updates",
    comment="Incoming daily patient updates"
)
def incremental_patient_updates():
    update_data = [
        (101,"Arjun Reddy","Hyderabad","Cardiology",6000,2),  # update
        (109,"New Patient","Chennai","Neurology",7000,1)      # insert
    ]

    cols = [
        "visit_id","patient_name","city",
        "department","consultation_fee","tests_count"
    ]

    return spark.createDataFrame(update_data, cols)


dlt.create_streaming_table("silver_patient_visits_incremental")

dlt.apply_changes(
    target="silver_patient_visits_incremental",
    source="incremental_patient_updates",
    keys=["visit_id"],
    sequence_by=col("visit_id"),
    stored_as_scd_type=1
)


@dlt.table(
    name="final_governed_patient_data",
    comment="Final curated dataset (governed layer)"
)
def final_governed_patient_data():
    return dlt.read("silver_patient_visits_incremental")