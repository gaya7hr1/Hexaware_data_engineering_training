with open("data.txt","r") as file:
    for line in file:
        print(line.strip())
file.close()
with open("data.txt","r") as file:
    students= file.readlines()
print("Total students:", len(students))
file.close()
total=0
with open('num.txt','r') as file:
    for line in file:
        total+=int(line.strip())
    print("Total =",total)
file.close()
with open("data.txt","w") as file:
    file.write("Rahul\n")
    file.write("Sneha\n")
    file.write("Arjun\n")
file.close()
with open("data.txt","a") as file:
    file.write("Priya\n")
languages=["python","java","c"]
with open('data.txt','w')as file:
    file.writelines(languages)