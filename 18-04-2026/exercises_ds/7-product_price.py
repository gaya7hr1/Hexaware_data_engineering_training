products = {
"Laptop":75000,
"Mobile":30000,
"Tablet":25000
}

#1. Increase all prices by 10%
print(products)
for i in products.keys():
    products[i]=products.get(i)+(products.get(i)*10)/100
#2. Print updated prices
print(products)