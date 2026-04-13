// 1
print("1. All products");
printjson(db.products.find().toArray());

// 2
print("2. Electronics products");
printjson(db.products.find({ category: "Electronics" }).toArray());

// 3
print("3. Products in Hyderabad");
printjson(db.products.find({ city: "Hyderabad" }).toArray());

// 4
print("4. Price > 30000");
printjson(db.products.find({ price: { $gt: 30000 } }).toArray());

// 5
print("5. Price < 20000");
printjson(db.products.find({ price: { $lt: 20000 } }).toArray());

// 6
print("6. Price between 10000 and 50000");
printjson(db.products.find({ price: { $gte: 10000, $lte: 50000 } }).toArray());

// 7
print("7. Furniture products");
printjson(db.products.find({ category: "Furniture" }).toArray());

// 8
print("8. Electronics in Hyderabad");
printjson(db.products.find({ category: "Electronics", city: "Hyderabad" }).toArray());

// 9
print("9. Hyderabad or Bangalore");
printjson(db.products.find({ city: { $in: ["Hyderabad", "Bangalore"] } }).toArray());

// 10
print("10. Not Furniture");
printjson(db.products.find({ category: { $ne: "Furniture" } }).toArray());

// 11
print("11. Name and price only");
printjson(db.products.find({}, { name: 1, price: 1, _id: 0 }).toArray());

// 12
print("12. Name, category, city");
printjson(db.products.find({}, { name: 1, category: 1, city: 1, _id: 0 }).toArray());

// 13
print("13. Sort price ascending");
printjson(db.products.find().sort({ price: 1 }).toArray());

// 14
print("14. Sort price descending");
printjson(db.products.find().sort({ price: -1 }).toArray());

// 15
print("15. Top 3 highest price");
printjson(db.products.find().sort({ price: -1 }).limit(3).toArray());

// 16
print("16. Lowest 2 price");
printjson(db.products.find().sort({ price: 1 }).limit(2).toArray());

// 17
print("17. Skip first 2");
printjson(db.products.find().skip(2).toArray());

// 18
print("18. Stock > 10");
printjson(db.products.find({ stock: { $gt: 10 } }).toArray());

// 19
print("19. Stock <= 10");
printjson(db.products.find({ stock: { $lte: 10 } }).toArray());

// 20
print("20. Electronics price > 40000");
printjson(db.products.find({ category: "Electronics", price: { $gt: 40000 } }).toArray());

// 21
print("21. Update Laptop price");
printjson(db.products.updateOne(
    { name: "Laptop" },
    { $set: { price: 80000 } }
));

// 22
print("22. Add discount to Electronics");
printjson(db.products.updateMany(
    { category: "Electronics" },
    { $set: { discount: 10 } }
));

// 23
print("23. Delete Printer");
printjson(db.products.deleteOne({ name: "Printer" }));

// 24
print("24. Delete Furniture");
printjson(db.products.deleteMany({ category: "Furniture" }));

// 25
print("25. Count all");
printjson(db.products.countDocuments());

// 26
print("26. Count Electronics");
printjson(db.products.countDocuments({ category: "Electronics" }));

// 27
print("27. Total stock per category");
printjson(db.products.aggregate([
    { $group: { _id: "$category", totalStock: { $sum: "$stock" } } }
]).toArray());

// 28
print("28. Avg price per category");
printjson(db.products.aggregate([
    { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
]).toArray());

// 29
print("29. Max price");
printjson(db.products.aggregate([
    { $group: { _id: null, maxPrice: { $max: "$price" } } }
]).toArray());

// 30
print("30. Total inventory value");
printjson(db.products.aggregate([
  { 
    $group: { 
      _id: null, 
      totalValue: { $sum: { $multiply: ["$price", "$stock"] } } 
    } 
  }
]).toArray());

//use retail_db;

db.products.insertMany([
  { _id: 1, name: "Laptop", category: "Electronics", price: 75000, stock: 10, city: "Hyderabad" },
  { _id: 2, name: "Phone", category: "Electronics", price: 50000, stock: 15, city: "Bangalore" },
  { _id: 3, name: "Chair", category: "Furniture", price: 7000, stock: 20, city: "Mumbai" },
  { _id: 4, name: "Desk", category: "Furniture", price: 15000, stock: 8, city: "Delhi" },
  { _id: 5, name: "Tablet", category: "Electronics", price: 30000, stock: 12, city: "Chennai" },
  { _id: 6, name: "Printer", category: "Electronics", price: 12000, stock: 5, city: "Hyderabad" }
]);


// output
/*1. All products
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
2. Electronics products
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
3. Products in Hyderabad
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
4. Price > 30000
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  }
]
5. Price < 20000
[
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
6. Price between 10000 and 50000
[
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
7. Furniture products
[
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  }
]
8. Electronics in Hyderabad
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
9. Hyderabad or Bangalore
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
10. Not Furniture
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
11. Name and price only
[
  { name: 'Laptop', price: 75000 },
  { name: 'Phone', price: 50000 },
  { name: 'Chair', price: 7000 },
  { name: 'Desk', price: 15000 },
  { name: 'Tablet', price: 30000 },
  { name: 'Printer', price: 12000 }
]
12. Name, category, city
[
  { name: 'Laptop', category: 'Electronics', city: 'Hyderabad' },
  { name: 'Phone', category: 'Electronics', city: 'Bangalore' },
  { name: 'Chair', category: 'Furniture', city: 'Mumbai' },
  { name: 'Desk', category: 'Furniture', city: 'Delhi' },
  { name: 'Tablet', category: 'Electronics', city: 'Chennai' },
  { name: 'Printer', category: 'Electronics', city: 'Hyderabad' }
]
13. Sort price ascending
[
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  }
]
14. Sort price descending
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  },
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  }
]
15. Top 3 highest price
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  }
]
16. Lowest 2 price
[
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
17. Skip first 2
[
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
18. Stock > 10
[
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  },
  {
    _id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 7000,
    stock: 20,
    city: 'Mumbai'
  },
  {
    _id: 5,
    name: 'Tablet',
    category: 'Electronics',
    price: 30000,
    stock: 12,
    city: 'Chennai'
  }
]
19. Stock <= 10
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 15000,
    stock: 8,
    city: 'Delhi'
  },
  {
    _id: 6,
    name: 'Printer',
    category: 'Electronics',
    price: 12000,
    stock: 5,
    city: 'Hyderabad'
  }
]
20. Electronics price > 40000
[
  {
    _id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 75000,
    stock: 10,
    city: 'Hyderabad'
  },
  {
    _id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 50000,
    stock: 15,
    city: 'Bangalore'
  }
]
21. Update Laptop price
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
22. Add discount to Electronics
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 4,
  modifiedCount: 4,
  upsertedCount: 0
}
23. Delete Printer
{
  acknowledged: true,
  deletedCount: 1
}
24. Delete Furniture
{
  acknowledged: true,
  deletedCount: 2
}
25. Count all
3
26. Count Electronics
3
27. Total stock per category
[ { _id: 'Electronics', totalStock: 37 } ]
28. Avg price per category
[ { _id: 'Electronics', avgPrice: 53333.333333333336 } ]
29. Max price 
[ { _id: null, maxPrice: 80000 } ]
30. Total inventory value
[ { _id: null, totalValue: 1910000 } ]
*/