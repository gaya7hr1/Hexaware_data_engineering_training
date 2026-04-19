import csv
with open("data.csv","r") as file:
    reader= csv.reader(file)
    for row in reader:
        print(row)
#read as dict
with open("data.csv","r") as file:
    reader=csv.DictReader(file)
    for row in reader:
        print(row)

#write
data=[
    ["name","marks"],
    ["priya",98],
    ["karan",75]
]
with open("output.csv","w",newline="") as file:
    writer=csv.writer(file)
    writer.writerows(data)
