# Write a program to print the factorial of a number.
fact=0
n=int(input("Enter a number:"))
for i in range(1,n):
    fact+=n*i
print("The factorial of",n,"is",fact)