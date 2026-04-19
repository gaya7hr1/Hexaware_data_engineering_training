emails = [
"user1@gmail.com",
"user2@yahoo.com",
"user3@gmail.com",
"user4@outlook.com"
]
#1. Extract domains
domains = [email.split("@")[1] for email in emails]

# 2. Count users per domain

dict={}
for i in domains:
    dict.setdefault(i,0)
    if i in dict:
        dict[i]+=1


print(domains)
print(dict)