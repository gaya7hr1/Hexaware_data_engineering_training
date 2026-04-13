

db.customers.insertMany([
  { customer_id:1, name:"Arjun", city:"Hyderabad" },
  { customer_id:2, name:"Rahul", city:"Bangalore" },
  { customer_id:3, name:"Sneha", city:"Mumbai" },
  { customer_id:4, name:"Amit", city:"Delhi" },
  { customer_id:5, name:"Priya", city:"Hyderabad" }
]);


db.products.insertMany([
  { product_id:101, name:"Laptop", category:"Electronics", price:75000 },
  { product_id:102, name:"Phone", category:"Electronics", price:50000 },
  { product_id:103, name:"Desk", category:"Furniture", price:15000 },
  { product_id:104, name:"Chair", category:"Furniture", price:7000 },
  { product_id:105, name:"Tablet", category:"Electronics", price:30000 }
]);


db.orders.insertMany([
  { order_id:1001, customer_id:1, product_id:101, quantity:1, order_date:"2024-03-01" },
  { order_id:1002, customer_id:2, product_id:102, quantity:1, order_date:"2024-03-02" },
  { order_id:1003, customer_id:1, product_id:105, quantity:2, order_date:"2024-03-03" },
  { order_id:1004, customer_id:3, product_id:103, quantity:1, order_date:"2024-03-05" },
  { order_id:1005, customer_id:5, product_id:102, quantity:3, order_date:"2024-03-07" }
]);

print("1"); printjson(db.customers.find().toArray());
print("2"); printjson(db.products.find().toArray());
print("3"); printjson(db.orders.find().toArray());
print("4"); printjson(db.customers.find({ city: "Hyderabad" }).toArray());
print("5"); printjson(db.products.find({ category: "Electronics" }).toArray());
print("6"); printjson(db.products.find({ price: { $gt: 30000 } }).toArray());
print("7"); printjson(db.orders.find({ quantity: { $gt: 1 } }).toArray());
print("8"); printjson(db.products.find().sort({ price: -1 }).toArray());
print("9"); printjson(db.customers.find().sort({ name: 1 }).toArray());
print("10"); printjson(db.orders.countDocuments());
print("11"); printjson(db.products.aggregate([{ $group: { _id: null, avgPrice: { $avg: "$price" } } }]).toArray());
print("12"); printjson(db.products.aggregate([{ $group: { _id: null, maxPrice: { $max: "$price" } } }]).toArray());
print("13"); printjson(db.orders.aggregate([{ $group: { _id: "$product_id", totalQty: { $sum: "$quantity" } } }]).toArray());
print("14"); printjson(db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "customer_id", as: "customer_details" } }
]).toArray());

print("15"); printjson(db.orders.aggregate([
  { $lookup: { from: "products", localField: "product_id", foreignField: "product_id", as: "product_details" } }
]).toArray());

print("16"); printjson(db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "customer_id", as: "customer" } },
  { $lookup: { from: "products", localField: "product_id", foreignField: "product_id", as: "product" } }
]).toArray());


print("17"); printjson(db.orders.aggregate([
  { $lookup: { from: "products", localField: "product_id", foreignField: "product_id", as: "product" } },
  { $unwind: "$product" },
  { $group: { _id: "$product.name", totalSold: { $sum: "$quantity" } } }
]).toArray());

print("18"); printjson(db.orders.aggregate([
  { $lookup: { from: "products", localField: "product_id", foreignField: "product_id", as: "product" } },
  { $unwind: "$product" },
  { $group: { _id: "$product.name", revenue: { $sum: { $multiply: ["$quantity", "$product.price"] } } } }
]).toArray());

print("19"); printjson(db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "customer_id", as: "customer" } },
  { $lookup: { from: "products", localField: "product_id", foreignField: "product_id", as: "product" } },
  { $unwind: "$customer" },
  { $unwind: "$product" },
  { $group: { _id: "$customer.name", totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } } } }
]).toArray());

print("20"); printjson(db.orders.aggregate([
  { $group: { _id: "$product_id", totalSold: { $sum: "$quantity" } } },
  { $sort: { totalSold: -1 } },
  { $limit: 1 }
]).toArray());

//output
/*1
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303ca'),
    customer_id: 1,
    name: 'Arjun',
    city: 'Hyderabad'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cb'),
    customer_id: 2,
    name: 'Rahul',
    city: 'Bangalore'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cc'),
    customer_id: 3,
    name: 'Sneha',
    city: 'Mumbai'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cd'),
    customer_id: 4,
    name: 'Amit',
    city: 'Delhi'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303ce'),
    customer_id: 5,
    name: 'Priya',
    city: 'Hyderabad'
  }
]
2
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 80000,
    stock: 10,
    city: 'Hyderabad',
    discount: 10
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore',
    discount: 10
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai',
    discount: 10
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cf'),
    product_id: 101,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d0'),
    product_id: 102,
    name: 'Phone',
3
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303d4'),
    order_id: 1001,
    customer_id: 1,
    product_id: 101,
    quantity: 1,
    order_date: '2024-03-01'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d5'),
    order_id: 1002,
    customer_id: 2,
    product_id: 102,
    quantity: 1,
    order_date: '2024-03-02'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d6'),
    order_id: 1003,
    customer_id: 1,
    product_id: 105,
    quantity: 2,
    order_date: '2024-03-03'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d7'),
    order_id: 1004,
    customer_id: 3,
    product_id: 103,
    quantity: 1,
    order_date: '2024-03-05'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d8'),
    order_id: 1005,
    customer_id: 5,
4
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303ca'),
    customer_id: 1,
    name: 'Arjun',
    city: 'Hyderabad'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303ce'),
    customer_id: 5,
    name: 'Priya',
    city: 'Hyderabad'
  }
]
5
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 80000,
    stock: 10,
    city: 'Hyderabad',
    discount: 10
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore',
    discount: 10
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai',
    discount: 10
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cf'),
    product_id: 101,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d0'),
    product_id: 102,
    name: 'Phone',
    category: 'Electronics',
    price: 50000
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d3'),
    product_id: 105,
    name: 'Tablet',
6
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 80000,
    stock: 10,
    city: 'Hyderabad',
    discount: 10
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore',
    discount: 10
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cf'),
    product_id: 101,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d0'),
    product_id: 102,
    name: 'Phone',
    category: 'Electronics',
    price: 50000
  }
]
7
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303d6'),
    order_id: 1003,
    customer_id: 1,
    product_id: 105,
    quantity: 2,
    order_date: '2024-03-03'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d8'),
    order_id: 1005,
    customer_id: 5,
    product_id: 102,
    quantity: 3,
    order_date: '2024-03-07'
  }
]
8
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 80000,
    stock: 10,
    city: 'Hyderabad',
    discount: 10
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cf'),
    product_id: 101,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore',
    discount: 10
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d0'),
    product_id: 102,
    name: 'Phone',
    category: 'Electronics',
    price: 50000
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai',
    discount: 10
  },
  {
9
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303cd'),
    customer_id: 4,
    name: 'Amit',
    city: 'Delhi'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303ca'),
    customer_id: 1,
    name: 'Arjun',
    city: 'Hyderabad'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303ce'),
    customer_id: 5,
    name: 'Priya',
    city: 'Hyderabad'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cb'),
    customer_id: 2,
    name: 'Rahul',
    city: 'Bangalore'
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303cc'),
    customer_id: 3,
    name: 'Sneha',
    city: 'Mumbai'
  }
]
10
5
11
[ { _id: null, avgPrice: 42125 } ]
12
[ { _id: null, maxPrice: 80000 } ]
13
[
  { _id: 105, totalQty: 2 },
  { _id: 103, totalQty: 1 },
  { _id: 101, totalQty: 1 },
  { _id: 102, totalQty: 4 }
]
14
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303d4'),
    order_id: 1001,
    customer_id: 1,
    product_id: 101,
    quantity: 1,
    order_date: '2024-03-01',
    customer_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303ca'),
        customer_id: 1,
        name: 'Arjun',
        city: 'Hyderabad'
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d5'),
    order_id: 1002,
    customer_id: 2,
    product_id: 102,
    quantity: 1,
    order_date: '2024-03-02',
    customer_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303cb'),
        customer_id: 2,
        name: 'Rahul',
        city: 'Bangalore'
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d6'),
    order_id: 1003,
    customer_id: 1,
    product_id: 105,
    quantity: 2,
    order_date: '2024-03-03',
    customer_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303ca'),
        customer_id: 1,
        name: 'Arjun',
        city: 'Hyderabad'
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d7'),
    order_id: 1004,
    customer_id: 3,
    product_id: 103,
    quantity: 1,
    order_date: '2024-03-05',
15
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303d4'),
    order_id: 1001,
    customer_id: 1,
    product_id: 101,
    quantity: 1,
    order_date: '2024-03-01',
    product_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303cf'),
        product_id: 101,
        name: 'Laptop',
        category: 'Electronics',
        price: 75000
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d5'),
    order_id: 1002,
    customer_id: 2,
    product_id: 102,
    quantity: 1,
    order_date: '2024-03-02',
    product_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303d0'),
        product_id: 102,
        name: 'Phone',
        category: 'Electronics',
        price: 50000
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d6'),
    order_id: 1003,
    customer_id: 1,
    product_id: 105,
    quantity: 2,
    order_date: '2024-03-03',
    product_details: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303d3'),
        product_id: 105,
        name: 'Tablet',
        category: 'Electronics',
        price: 30000
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d7'),
    order_id: 1004,
    customer_id: 3,
    product_id: 103,
    quantity: 1,
16
[
  {
    _id: ObjectId('69dd1adb4d831d047bf303d4'),
    order_id: 1001,
    customer_id: 1,
    product_id: 101,
    quantity: 1,
    order_date: '2024-03-01',
    customer: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303ca'),
        customer_id: 1,
        name: 'Arjun',
        city: 'Hyderabad'
      }
    ],
    product: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303cf'),
        product_id: 101,
        name: 'Laptop',
        category: 'Electronics',
        price: 75000
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d5'),
    order_id: 1002,
    customer_id: 2,
    product_id: 102,
    quantity: 1,
    order_date: '2024-03-02',
    customer: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303cb'),
        customer_id: 2,
        name: 'Rahul',
        city: 'Bangalore'
      }
    ],
    product: [
      {
        _id: ObjectId('69dd1adb4d831d047bf303d0'),
        product_id: 102,
        name: 'Phone',
        category: 'Electronics',
        price: 50000
      }
    ]
  },
  {
    _id: ObjectId('69dd1adb4d831d047bf303d6'),
    order_id: 1003,
    customer_id: 1,
    product_id: 105,
    quantity: 2,
    order_date: '2024-03-03',
17
[
  { _id: 'Tablet', totalSold: 2 },
  { _id: 'Desk', totalSold: 1 },
  { _id: 'Laptop', totalSold: 1 },
  { _id: 'Phone', totalSold: 4 }
]
18
[
  { _id: 'Tablet', revenue: 60000 },
  { _id: 'Desk', revenue: 15000 },
  { _id: 'Laptop', revenue: 75000 },
  { _id: 'Phone', revenue: 200000 }
]
19
[
  { _id: 'Sneha', totalRevenue: 15000 },
  { _id: 'Priya', totalRevenue: 150000 },
  { _id: 'Arjun', totalRevenue: 135000 },
  { _id: 'Rahul', totalRevenue: 50000 }
]
20
[ { _id: 102, totalSold: 4 } ]
retail_db
Selection deleted

*/
