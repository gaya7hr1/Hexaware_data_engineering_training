numbers = [10,20,10,30,20,10,40]
#1. Count how many times each number appears
result = {}
for i in numbers:
    result.setdefault(i, 0)
    result[i] += 1

#2. Store the result in a dictionary
print(result)