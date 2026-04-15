#Write a program to calculate the sum of elements in a list.
lst=eval(input("Enter a list: "))
summ=0
for i in range(0,len(lst)):
    summ+=lst[i]
print("The sum of elements in the list is ", summ)