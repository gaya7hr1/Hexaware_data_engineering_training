#Write a program to find the largest number in a list .
lst=eval(input("Enter a list:"))
max= float('-inf')
for i in lst:
    if i >max:
        max=i
print("The maximum in the list is",max)