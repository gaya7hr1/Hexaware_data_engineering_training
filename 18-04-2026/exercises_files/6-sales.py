import csv

with open("data/sales.csv") as f:
    data = list(csv.DictReader(f))

#1 total revenue
print(sum(int(x["quantity"]) * int(x["price"]) for x in data))

#2 qty per product
qty = {}
for x in data:
    p = x["product"]
    qty[p] = qty.get(p, 0) + int(x["quantity"])
print(qty)

#3 highest sales product (by revenue)
rev = {}
for x in data:
    p = x["product"]
    r = int(x["quantity"]) * int(x["price"])
    rev[p] = rev.get(p, 0) + r
print(max(rev, key=rev.get))

#4 revenue per product
print(rev)

#5 products > 50000
print([p for p in rev if rev[p] > 50000])
#6
for p in qty:
    print(p, "-> Qty:", qty[p], "Revenue:", rev[p])