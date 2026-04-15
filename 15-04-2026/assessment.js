//1.
db.members.find();
//2.
db.books.find();
//3.
db.borrowings.find();
//4
db.members.find({city: "Hyderabad"});
//5.
db.books.find({category: "Database"});
//6
db.books.find({ price:{ $gt: 600 }});
//7.
db.borrowings.find({days_borrowed:{ $gt: 5 }});
//8.
db.books.find().sort({price: -1});
//9
db.members.find().sort({ name: 1 });
//10
db.members.countDocuments();
//11.
db.books.countDocuments();
//12.
db.books.countDocuments({ category: "Database" });
//13.
db.books.aggregate([{ $group: { _id: null, avgPrice: { $avg: "$price" }}}]);
//14.
db.books.aggregate([{$group: {_id: null, maxPrice: {$max: "$price"}}}]);
//15.
db.books.aggregate([{$group:{ _id: null, minPrice:{$min: "$price"}}}]);
//16.
db.borrowings.aggregate([{$group:{_id:"$member_id",totalDays:{$sum: "$days_borrowed"}}}]);
//17.
db.borrowings.aggregate([{$lookup: {from: "members",localField: "member_id",foreignField: "member_id",as: "member_details"}}]);
// 18.
db.borrowings.aggregate([{$lookup: {from: "books",localField: "book_id",foreignField: "book_id",as: "book_details"}}]);
//19.
db.borrowings.aggregate([{$lookup:{
    from:"members",localField:"member_id",foreignField:"member_id",as:"member"}},
    {$lookup:{from:"books",localField:"book_id",foreignField:"book_id",as:"book"}},
    {$unwind:"$member"},{$unwind:"$book"},
    {$project:{_id:0,member_name:"$member.name",book_title:"$book.title"}}]);
//20
db.borrowings.aggregate([{$group:{_id:"$book_id",totalBorrowed:{$sum:1}}},
    {$lookup:{from:"books",localField:"_id",foreignField:"book_id",as:"book"}},
    {$unwind:"$book"},{$project:{_id:0,book_title:"$book.title",totalBorrowed:1}}]);
//21.
db.borrowings.aggregate([{$group: {_id: "$member_id",totalBooks: { $sum: 1 }}}]);

//22.
db.borrowings.aggregate([{$group: {_id: "$book_id",count: { $sum: 1 }}},
    {$sort: { count: -1}},{ $limit: 1 }]);
//23
db.borrowings.aggregate([{$lookup:{from:"books",localField:"book_id",foreignField:"book_id",as:"book"}},
    {$unwind:"$book"},{$group:{_id:"$book.category",totalBorrowed:{$sum:1}}},
    {$project:{_id:0,category:"$_id",totalBorrowed:1}}]);
//24.
db.borrowings.aggregate([{$group: {_id: "$member_id",count: { $sum: 1 }}},{$match: { count: { $gt: 1 } } }]);
//25.
db.borrowings.aggregate([{$lookup:{from:"members",localField:"member_id",foreignField:"member_id",as:"member"}},
    {$unwind:"$member"},{$group:{_id:"$member.name",city:{$first:"$member.city"},totalBorrowed:{$sum:1}}},
    {$project:{_id:0,name:"$_id",city:1,totalBorrowed:1}},{$sort:{totalBorrowed:-1}}]);
