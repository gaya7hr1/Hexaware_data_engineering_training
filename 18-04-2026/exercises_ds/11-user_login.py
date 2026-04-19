logins = [
("Rahul","10:00"),
("Sneha","10:10"),
("Rahul","11:00"),
("Arjun","11:15"),
("Sneha","11:30")
]


#1. Count how many times each user logged in
#2. Store results in dictionary
count = {}
for user,_ in logins:
    count[user] = count.get(user, 0) + 1

print(count)
