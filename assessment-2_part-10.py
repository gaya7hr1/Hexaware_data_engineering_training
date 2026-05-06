import dlt
from pyspark.sql.functions import *

@dlt.table(
    name="bronze_orders"
)
def bronze_orders():

    data = [
    (301,101,201,"Hyderabad","Groceries",24000),
    (302,102,201,"Bengaluru","Groceries",31500),
    (303,111,204,"Delhi","Electronics",90000),
    (304,114,208,"Kolkata","Electronics",125000),
    (305,115,204,"Delhi","Electronics",186000),
    (306,104,202,"Chennai","Dairy",3000),
    (307,105,202,"Chennai","Dairy",8100),
    (308,117,206,"Pune","Home Appliances",24500)
    ]

    columns = [
    "order_id",
    "product_id",
    "supplier_id",
    "supplier_city",
    "category",
    "bill_amount"
    ]

    return spark.createDataFrame(data,columns)


@dlt.table(
    name="silver_orders"
)
def silver_orders():

    return dlt.read("bronze_orders") \
    .filter(col("bill_amount") > 0)


@dlt.table(
    name="gold_city_revenue"
)
def gold_city_revenue():

    df = dlt.read("silver_orders")

    return df.groupBy("supplier_city") \
    .agg(sum("bill_amount").alias("total_revenue"))


@dlt.table(
    name="gold_category_revenue"
)
def gold_category_revenue():

    df = dlt.read("silver_orders")

    return df.groupBy("category") \
    .agg(sum("bill_amount").alias("total_revenue"))