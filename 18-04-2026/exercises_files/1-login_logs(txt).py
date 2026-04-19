#1. Read the file and print all names.
with open("data/login.txt","r") as file:
    for l in file:
        print(l.strip())
file.close()
#2. Count the total number of login records.
with open("data/login.txt", "r") as file:
    count=0
    for l in file:
        count+=1
    print("count is",count)
file.close()
#3. Find how many times each user logged in.
with open("data/login.txt","r") as file:
    dict={}
    for l in file:
        if l.strip() in dict:
            dict[l.strip()]+=1
        dict.setdefault(l.strip(), 1)
    print("count is",dict)
file.close()
#4. Find the user who logged in the most.
print(max(dict, key=dict.get))
#5. Print the unique users.
print(set(dict))
