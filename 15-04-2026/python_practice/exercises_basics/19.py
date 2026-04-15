#Write a program to find the smallest number in a list.

lst=eval(input("Enter a list:"))
min= float('inf')
for i in lst:
    if i <min:
        min=i
print("The maximum in the list is",min)