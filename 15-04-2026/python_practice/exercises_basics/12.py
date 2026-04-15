# Write a program that takes marks as input and prints grade:
mark=int(input("Enter marks: "))
if mark>90:
    print("Grade A")
elif mark>70:
    print("Grade B")
elif mark>50:
    print("Grade C")
else:
    print("Fail")