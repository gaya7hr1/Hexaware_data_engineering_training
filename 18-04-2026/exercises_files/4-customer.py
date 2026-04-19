import json

with open("data/orders.json") as f:
    orders = json.load(f)["orders"]
print(orders)
#2. Calculate total revenue.
print(sum(o["amount"] for o in orders))
#3. Find total spending per customer.
spend={}
for i in orders:
    spend.setdefault(i["customer"], 0)
    if i["customer"] in spend:
        spend[i["customer"]] += i["amount"]
print(spend)
#4. Find the highest spending customer.
print(max(spend, key=spend.get))
#5. Count total orders per customer.
count = {}
for o in orders:
    c = o["customer"]
    count[c] = count.get(c, 0) + 1
print(count)