classA = {"Rahul","Sneha","Amit","Neha"}
classB = {"Sneha","Amit","Karan","Riya"}
#1. Students in both classes
print(classA.intersection(classB))
# 2. Students only in Class A
print(classA - classB)

# 3. All unique students
print(classA.union(classB))