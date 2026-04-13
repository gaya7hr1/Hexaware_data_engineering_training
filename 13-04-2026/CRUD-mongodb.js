
db.employees.insertMany([
  {_id: 1, name: 'Clark', dept: 'Sales',salary:45000,city:'Hyderabad' },
  {_id: 2, name: 'Dave', dept: 'Accounting' ,salary:50000,city:'Mumbai'},
  {_id: 3, name: 'Ava', dept: 'Sales',salary:47000,city:'Banglore' }
]);

// READ- all
print("Initial data:")
printjson(db.employees.find().toArray());

// READ- filter document
print("\n Employees in Sales department:")
printjson(db.employees.find({dept:"Sales"}).toArray());

// READ- specific fields
print("only some fields")
printjson(db.employees.find({},{name:1,dept:1,_id:0}).toArray());

// UPDATE- update one 
db.employees.updateOne(
  {_id:1},
  {$set:{salary:48000}}
  );
print("After updateOne (_id:1 salary changed)")
printjson(db.employees.find({_id:1}).toArray());

// UPDATE- update many
db.employees.updateMany(
  {dept:"Sales"},
  {$set:{bonus:5000}}
  );
print("After updateMany (Sales employees got bonus):")
printjson(db.employees.find({dept:"Sales"}).toArray());

// DELETE - delete one

db.employees.deleteOne({_id:2});
print("\n After deleteOne ")
printjson(db.employees.find().toArray());

// DELETE - delete many
db.employees.deleteMany({dept: "Sales"});
print("\n After deleteMany (sales employees removed): ")
printjson(db.employees.find().toArray());















