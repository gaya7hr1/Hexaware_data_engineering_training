students = {
"Rahul":85,
"Sneha":92,
"Arjun":78,
"Priya":88
}
#1. Print the topper
print(max( students.values()))

#2. Print average marks
print(sum( students.values())/len(students.values()))
#3. Print students scoring above 85
print(*[x for x in students.values() if x>85] )