with open("data/numbers.txt") as f:
    nums = [int(line.strip()) for line in f]

#1
print(nums)

#2
print(sum(nums))

#3
print(max(nums))

#4
print(min(nums))

#5
print(len([x for x in nums if x > 50]))