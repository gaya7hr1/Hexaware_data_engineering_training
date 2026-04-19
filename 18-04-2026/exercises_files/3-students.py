import json
#1. Print all student names.
with open("data/students.json") as file:
    data=json.load(file)
for student in data["students"]:
    print(student["name"])
#2. Print students enrolled in Python course.
for student in data["students"]:
    if student["course"] == "Python":
        print(student["name"])
#3 Highest marks student
top = data[0]
for s in data:
    if s["marks"] > top["marks"]:
        top = s
print(top)

#4 Average marks
total = 0
for s in data:
    total += s["marks"]

avg = total / len(data)
print(avg)

#5 Count students per course
course_count = {}
for s in data:
    c = s["course"]
    if c in course_count:
        course_count[c] += 1
    else:
        course_count[c] = 1

print(course_count)

