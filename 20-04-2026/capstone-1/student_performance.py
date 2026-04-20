import json
import csv

# Task 26
def read_students(path):
    with open(path) as f:
        return [line.strip() for line in f]

# Task 27
def load_marks(path):
    with open(path) as f:
        return json.load(f)["students"]

# Task 28
def load_attendance(path):
    with open(path) as f:
        return list(csv.DictReader(f))

# Task 29
def avg_marks(data):
    return sum(s["marks"] for s in data) / len(data)

# Task 30
def attendance_percent(a):
    return (int(a["days_present"]) / int(a["total_days"])) * 100

# Task 31
def topper(data):
    top = data[0]
    for s in data:
        if s["marks"] > top["marks"]:
            top = s
    return top

# Task 32
def grade(m):
    if m >= 90: return "A"
    elif m >= 75: return "B"
    elif m >= 50: return "C"
    else: return "Fail"






# Task 1
students = read_students("data/students.txt")
print(students)

# Task 2
print("Total students:", len(students))

# Task 3
unique_students = set(students)
print("Unique students:", unique_students)

# Task 4
count = {}
for s in students:
    count[s] = count.get(s, 0) + 1
print("Count:", count)

# Task 5
with open("data/unique_students.txt", "w") as f:
    for s in unique_students:
        f.write(s + "\n")




# Task 6
data = load_marks("data/marks.json")

# Task 7
for s in data:
    print(s["name"], s["marks"])

# Task 8
print("Topper:", topper(data))

# Task 9
low = data[0]
for s in data:
    if s["marks"] < low["marks"]:
        low = s
print("Lowest:", low)

# Task 10
avg = avg_marks(data)
print("Average:", avg)

# Task 11
print([s["name"] for s in data if s["course"] == "Python"])

# Task 12
course_count = {}
for s in data:
    c = s["course"]
    course_count[c] = course_count.get(c, 0) + 1
print(course_count)




# Task 13
att = load_attendance("data/attendance.csv")

# Task 14
for a in att:
    print(a)

# Task 15
for a in att:
    a["percent"] = attendance_percent(a)

# Task 16
print([a["name"] for a in att if a["percent"] < 80])

# Task 17
best = att[0]
for a in att:
    if a["percent"] > best["percent"]:
        best = a
print("Best attendance:", best)


# Task 18
marks = [s["marks"] for s in data]
print(max(marks), min(marks), sum(marks))

# Task 19
courses = tuple(s["course"] for s in data)
print(courses)

# Task 20
print(set(courses))

# Task 21
marks_dict = {s["name"]: s["marks"] for s in data}
print(marks_dict)

# Task 22
att_dict = {a["name"]: a["percent"] for a in att}
print(att_dict)



# Task 23
for s in data:
    print(s["name"], "Pass" if s["marks"] >= 50 else "Fail")

# Task 24
for s in data:
    s["grade"] = grade(s["marks"])

# Task 25
print([
    s["name"] for s in data
    if s["marks"] > 80 and att_dict[s["name"]] > 85
])


# Task 33
final = {}
for s in data:
    name = s["name"]
    final[name] = {
        "marks": s["marks"],
        "attendance": att_dict[name],
        "course": s["course"],
        "grade": s["grade"]
    }

# Task 34
for k, v in final.items():
    print(k, v)

# Task 35
eligible = [k for k, v in final.items()
            if v["marks"] >= 75 and v["attendance"] >= 80]

# Task 36
improve = [k for k, v in final.items()
           if v["marks"] < 75 or v["attendance"] < 80]


# Task 37
with open("data/report.txt", "w") as f:
    f.write("Student Report\n")
    for k, v in final.items():
        f.write(f"{k} - Marks: {v['marks']} - Attendance: {v['attendance']}% - Grade: {v['grade']}\n")

# Task 38
with open("data/eligible_students.txt", "w") as f:
    f.write(", ".join(eligible))


# -------- FINAL OUTPUT --------

# Task 39
print("Topper:", topper(data)["name"])
print("Best Attendance:", best["name"])
print("Average Marks:", avg)
print("Eligible Students:", ", ".join(eligible))
print("Students Needing Improvement:", ", ".join(improve))

