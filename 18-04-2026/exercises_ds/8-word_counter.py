sentence = "python is easy and python is powerful"
data=sentence.split(" ")

#1. Count frequency of each word
dict={}
for i in data:
    dict.setdefault(i,0)
    if i in dict:
        dict[i]+=1
print(dict)
#2. Store results in dictionary