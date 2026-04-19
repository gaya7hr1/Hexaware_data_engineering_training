student ={
    "name":"Rahul",
    "age":22,
    "course":"python"
}
print(student)
print(student["name"])
print(student["age"])
print(student["course"])

#get
print(student.get("name"))
print(student.get("age"))

#add new pair
student["city"]="Hyderabad"
print(student)