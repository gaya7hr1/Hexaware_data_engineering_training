numbers=[10,20,40]
numbers.insert(2,30)
print(numbers)

numbers=[10,20,30,40]
numbers.remove(30)
print(numbers)

numbers.pop()
print(numbers)
print(len(numbers))

numbers=[10,20,30,40]
for num in numbers:
    print(num)
fruits=["apple","banana","mango"]
if "banana" in fruits:
    print("Banana exists")