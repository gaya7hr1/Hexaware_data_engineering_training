import json
import csv

# Task 23
def load_visits(path):
    with open(path) as file_t:
        return [line.strip() for line in file_t]

# Task 24
def load_products(path):
    with (open(path) as file_j):
        return json.load(file_j)["products"]

# Task 25
def load_orders(path):
    with open(path) as file_c:
        return list(csv.DictReader(file_c))

# Task 26
def product_revenue(orders, product_dict):
    revenue = {}
    for o in orders:
        pid = int(o["product_id"])
        qty = int(o["quantity"])
        name = product_dict[pid]["name"]
        price = product_dict[pid]["price"]

        revenue[name] = revenue.get(name, 0) + price * qty
    return revenue

# Task 27
def customer_spending(orders, product_dict):
    spending = {}
    for o in orders:
        cust = o["customer"]
        pid = int(o["product_id"])
        qty = int(o["quantity"])
        price = product_dict[pid]["price"]

        spending[cust] = spending.get(cust, 0) + price * qty
    return spending

# Task 28
def top_customer(spending):
    top = list(spending.keys())[0]
    for k in spending:
        if spending[k] > spending[top]:
            top = k
    return top


# Task 1
visits = load_visits("data/website_visits.txt")

# Task 2
print(visits)

# Task 3
print("Total visits:", len(visits))

# Task 4
unique_visitors = set(visits)
print("Unique visitors:", unique_visitors)

# Task 5
visit_dict = {}
for i in visits:
    visit_dict[i] = visit_dict.get(i, 0) + 1
print(visit_dict)

# Task 6
most = list(visit_dict.keys())[0]
for i in visit_dict:
    if visit_dict[i] > visit_dict[most]:
        most = i
print("Most frequent visitor:", most)


# Task 7
products = load_products("data/products.json")

# Task 8
for p in products:
    print(p["name"], p["price"])

# Task 9
product_dict = {}
for p in products:
    product_dict[p["product_id"]] = {
        "name": p["name"],
        "price": p["price"]
    }

# Task 10
max_p = products[0]
for p in products:
    if p["price"] > max_p["price"]:
        max_p = p
print("Most expensive:", max_p)

# Task 11
min_p = products[0]
for p in products:
    if p["price"] < min_p["price"]:
        min_p = p
print("Least expensive:", min_p)


# Task 12
orders = load_orders("data/orders.csv")

# Task 13
for o in orders:
    print(o)

# Task 14
qty_dict = {}
for o in orders:
    pid = int(o["product_id"])
    qty = int(o["quantity"])
    qty_dict[pid] = qty_dict.get(pid, 0) + qty
print(qty_dict)

# Task 15
orderspc = {}
for o in orders:
    c = o["customer"]
    orderspc[c] = orderspc.get(c, 0) + 1
print(orderspc)


# Task 16
for o in orders:
    pid = int(o["product_id"])
    qty = int(o["quantity"])
    price = product_dict[pid]["price"]
    o["revenue"] = price * qty

# Task 17
total_revenue = sum(o["revenue"] for o in orders)
print("Total revenue:", total_revenue)

# Task 18
revenuepp = product_revenue(orders, product_dict)
print(revenuepp)

# Task 19
top_prod = list(revenuepp.keys())[0]
for i in revenuepp:
    if revenuepp[i] > revenuepp[top_prod]:
        top_prod = i
print("Top product:", top_prod)



# Task 20
spending = customer_spending(orders, product_dict)
print(spending)

# Task 21
print("Top customer:", top_customer(spending))

# Task 22
print([k for k, v in spending.items() if v > 50000])


revenue_tuples = [(k, v) for k, v in revenuepp.items()]
print(revenue_tuples)


with open("data/sales_report.txt", "w") as f:
    f.write("E-Commerce Sales Report\n")
    f.write(f"Total Website Visits: {len(visits)}\n")
    f.write(f"Unique Visitors: {len(unique_visitors)}\n")
    f.write(f"Total Revenue: {total_revenue}\n")
    f.write(f"Top Customer: {top_customer(spending)}\n\n")

    f.write("Product Sales\n")
    for k, v in revenuepp.items():
        f.write(f"{k}  {v}\n")

# Task 29
visitors_no_orders = [v for v in unique_visitors if v not in orderspc]
print("Visited but not ordered:", visitors_no_orders)

# Task 30
low_visit = [
    c for c in orderspc
    if visit_dict.get(c, 0) <= 1
]
print("Ordered but low visits:", low_visit)

