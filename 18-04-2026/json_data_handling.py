import json
with open("data.json","r") as file:
    data=json.load(file)
print(data)
for student in data["students"]:
    print(student["name"],student["marks"])
#write
students={
    "students":[
        {"name":"priya","marks":88},
        {"name":"karan","marks":98}
    ]
}
with open("data.json","w") as file:
    json.dump(students,file,indent=4)