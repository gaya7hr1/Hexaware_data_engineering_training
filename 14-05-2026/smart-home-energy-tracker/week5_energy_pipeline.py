import pandas as pd
import numpy as np

print("Smart Energy Pipeline Started")

df = pd.read_csv("energy_usage.csv")

df["timestamp"] = pd.to_datetime(df["timestamp"])
df["energy_kwh"] = pd.to_numeric(df["energy_kwh"], errors="coerce")
df["device_name"] = df["device_name"].str.strip().str.title()
df["room_name"] = df["room_name"].str.strip().str.title()
df["status"] = df["status"].str.strip().str.lower()

df.dropna(subset=["energy_kwh"], inplace=True)
df["date"] = df["timestamp"].dt.date
df["week"] = df["timestamp"].dt.to_period("W")
df["month"] = df["timestamp"].dt.to_period("M")
df.reset_index(drop=True, inplace=True)

print(f"Loaded {len(df)} records")

device_summary = df.groupby(["device_id", "device_name", "room_name"])["energy_kwh"] \
    .agg(total_kwh="sum", avg_kwh="mean", num_logs="count") \
    .round(3) \
    .reset_index() \
    .sort_values("total_kwh", ascending=False)

print("\nDevice Summary")
print(device_summary.to_string(index=False))

daily_device = df.groupby(["device_name", "date"])["energy_kwh"] \
    .sum() \
    .reset_index() \
    .rename(columns={"energy_kwh": "daily_kwh"})

threshold = 10.0

daily_device["alert"] = np.where(
    daily_device["daily_kwh"] > threshold,
    "HIGH USAGE ALERT",
    "NORMAL"
)

alerts = daily_device[daily_device["alert"] == "HIGH USAGE ALERT"]

if not alerts.empty:
    print(f"\nALERT: {len(alerts)} device-day(s) exceeded {threshold} kWh threshold:")
    print(alerts.to_string(index=False))
else:
    print(f"\nNo device exceeded {threshold} kWh on any single day.")

device_summary.to_csv("energy_device_report.csv", index=False)
daily_device.to_csv("energy_daily_report.csv",  index=False)

print("\nReports Saved: energy_device_report.csv, energy_daily_report.csv")
print("Smart Energy Pipeline Completed")
