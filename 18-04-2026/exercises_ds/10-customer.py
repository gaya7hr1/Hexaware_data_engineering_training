orders = [
{"order_id":1,"customer":"Rahul","amount":2500},
{"order_id":2,"customer":"Sneha","amount":1800},
{"order_id":3,"customer":"Rahul","amount":3200},
{"order_id":4,"customer":"Amit","amount":1500}
]
#1. Calculate total spending per customer
total_spending = {}
order_count = {}

for order in orders:
    customer = order["customer"]
    amt = order["amount"]

    total_spending[customer] = total_spending.get(customer, 0) + amt
    order_count[customer] = order_count.get(customer, 0) + 1
#2. Find highest spending customer
highest = max(total_spending)

print(total_spending)
print(highest)
print(order_count)
#3. Count total orders per customer