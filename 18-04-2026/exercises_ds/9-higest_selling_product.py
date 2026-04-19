sales = [
{"product":"Laptop","qty":5},
{"product":"Mouse","qty":20},
{"product":"Laptop","qty":3},
{"product":"Keyboard","qty":10}
]

#1. Calculate total sales per product
total = {}
for item in sales:
    prod = item["product"]
    qty = item["qty"]
    total[prod] = total.get(prod, 0) + qty

print(total)

#2. Highest selling product
highest = max(total)
print(highest)