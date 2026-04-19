numbers= {10,20,30,40}
print(numbers)

numbers= {10,20,30,40,40}
print(numbers)
#list to set
numbers= {10,20,30,40,40}
unique_numbers= set(numbers)
print(unique_numbers)

#add
numbers={10,20,30}
numbers.add(40)
print(numbers)

#update
numbers={10,20,30}
numbers.update({40,50})
print(numbers)

set1={10,20,30}
set2={30,40,50}
result=set1.union(set2)
print(result)

result=set1.difference(set2)
print(result)

result=set1.symmetric_difference(set2)  #exclusive or
print(result)
result=set1.intersection(set2)
print(result)