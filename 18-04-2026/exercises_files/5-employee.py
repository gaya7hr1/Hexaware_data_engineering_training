import csv

with open("data/employee.csv") as f:
    data = list(csv.DictReader(f))

#1
print([e["name"] for e in data])

#2
print([e["name"] for e in data if e["department"] == "IT"])

#3
avg = sum(int(e["salary"]) for e in data) / len(data)
print(avg)

#4
highest = data[0]

for e in data:
    if int(e["salary"]) > int(highest["salary"]):
        highest = e

print(highest)

#5
dept = {}
for e in data:
    d = e["department"]
    dept[d] = dept.get(d, 0) + 1
print(dept)