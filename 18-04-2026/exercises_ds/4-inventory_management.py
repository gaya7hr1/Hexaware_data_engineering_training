inventory = {
"laptop":10,
"mouse":25,
"keyboard":15
}
#1. Add "monitor":8
inventory["monitor"]=8
print(inventory)
#2. Reduce laptop stock by 2
inventory["laptop"]=inventory.get("laptop")-2
print(inventory)
#3. Print items with stock less than 10
for i in inventory.keys():
    if inventory.get(i)<10:
        print(i)