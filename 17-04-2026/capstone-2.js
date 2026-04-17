//1
db.patients.find();

//2
db.doctors.find();

//3
db.appointments.find();

//4
db.patients.find({city:"Hyderabad"});

//5
db.doctors.find({specialization:"Cardiology"});

//6
db.appointments.find({status:"Completed"});

//7
db.patients.find({age:{$gt:30}});

//8
db.doctors.find({consultation_fee:{$gt:1000}});

//9
db.doctors.find({consultation_fee:{$gte:900,$lte:1600}});

//10
db.appointments.find({bill_amount:{$gt:1000}});

//11
db.appointments.find({status:{$ne:"Cancelled"}});

//12
db.patients.find({city:{$in:["Hyderabad","Mumbai"]}});

//13
db.doctors.find({city:{$in:["Hyderabad","Delhi"]}});

//14
db.patients.find({}, {_id:0,name:1,city:1});

//15
db.doctors.find({}, {_id:0,name:1,specialization:1,consultation_fee:1});

//16
db.appointments.find({}, {_id:0,appointment_id:1,status:1,bill_amount:1});

//17
db.doctors.find().sort({consultation_fee:1});

//18
db.doctors.find().sort({consultation_fee:-1});

//19
db.doctors.find().sort({consultation_fee:-1}).limit(3);

//20
db.doctors.find().sort({consultation_fee:1}).limit(2);

//21
db.patients.find().skip(2);

//22
db.patients.find().sort({age:-1});

//23
db.doctors.updateOne({name:"Dr. Sharma"},{$set:{consultation_fee:1300}});

//24
db.appointments.updateMany({status:"Pending"},{$set:{priority:"High"}});

//25
db.doctors.updateMany({city:"Hyderabad"},{$set:{available:true}});

//26
db.patients.updateOne({name:"Meera"},{$set:{city:"Bangalore"}});

//27
db.doctors.deleteOne({name:"Dr. Iyer"});

//28
db.appointments.deleteMany({status:"Cancelled"});

//29
db.patients.deleteMany({city:"Delhi"});

//30
db.patients.countDocuments();

//31
db.doctors.countDocuments({city:"Hyderabad"});

//32
db.appointments.countDocuments({status:"Completed"});

//33
db.patients.countDocuments({city:"Hyderabad"});

//34
db.doctors.aggregate([
{$group:{_id:"$specialization",avgFee:{$avg:"$consultation_fee"}}}
]);

//35
db.doctors.aggregate([
{$group:{_id:null,maxFee:{$max:"$consultation_fee"}}}
]);

//36
db.doctors.aggregate([
{$group:{_id:null,minFee:{$min:"$consultation_fee"}}}
]);

//37
db.appointments.aggregate([
{$group:{_id:"$status",totalBill:{$sum:"$bill_amount"}}}
]);

//38
db.appointments.aggregate([
{$group:{_id:"$doctor_id",count:{$sum:1}}}
]);

//39
db.appointments.aggregate([
{$group:{_id:"$patient_id",count:{$sum:1}}}
]);

//40
db.patients.aggregate([
{$group:{_id:"$city",avgAge:{$avg:"$age"}}}
]);

//41
db.appointments.aggregate([
{$group:{_id:"$doctor_id",totalBill:{$sum:"$bill_amount"}}}
]);

//42
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"pat"}},
{$unwind:"$pat"},
{$group:{_id:"$pat.city",totalBill:{$sum:"$bill_amount"}}}
]);

//43
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"patient"}}
]);

//44
db.appointments.aggregate([
{$lookup:{from:"doctors",localField:"doctor_id",foreignField:"doctor_id",as:"doctor"}}
]);

//45
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"pat"}},
{$unwind:"$pat"},
{$lookup:{from:"doctors",localField:"doctor_id",foreignField:"doctor_id",as:"doc"}},
{$unwind:"$doc"},
{$project:{_id:0,patient_name:"$pat.name",doctor_name:"$doc.name"}}
]);

//46
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"pat"}},
{$unwind:"$pat"},
{$lookup:{from:"doctors",localField:"doctor_id",foreignField:"doctor_id",as:"doc"}},
{$unwind:"$doc"},
{$project:{_id:0,patient_name:"$pat.name",city:"$pat.city",doctor_name:"$doc.name",specialization:"$doc.specialization",status:1,bill_amount:1}}
]);

//47
db.patients.aggregate([
{$lookup:{from:"appointments",localField:"patient_id",foreignField:"patient_id",as:"appointments"}}
]);

//48
db.doctors.aggregate([
{$lookup:{from:"appointments",localField:"doctor_id",foreignField:"doctor_id",as:"appointments"}}
]);

//49
db.appointments.aggregate([
{$group:{_id:"$doctor_id",revenue:{$sum:"$bill_amount"}}}
]);

//50
db.appointments.aggregate([
{$lookup:{from:"doctors",localField:"doctor_id",foreignField:"doctor_id",as:"doc"}},
{$unwind:"$doc"},
{$group:{_id:"$doc.specialization",revenue:{$sum:"$bill_amount"}}}
]);

//51
db.appointments.aggregate([
{$group:{_id:"$patient_id",total:{$sum:"$bill_amount"}}},
{$sort:{total:-1}},
{$limit:1}
]);

//52
db.appointments.aggregate([
{$group:{_id:"$doctor_id",count:{$sum:1}}},
{$sort:{count:-1}},
{$limit:1}
]);

//53
db.appointments.aggregate([
{$match:{status:"Completed"}},
{$group:{_id:null,revenue:{$sum:"$bill_amount"}}}
]);

//54
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"pat"}},
{$unwind:"$pat"},
{$group:{_id:"$pat.city",count:{$sum:1}}},
{$sort:{count:-1}},
{$limit:1}
]);

//55
db.appointments.aggregate([
{$lookup:{from:"patients",localField:"patient_id",foreignField:"patient_id",as:"pat"}},
{$unwind:"$pat"},
{$group:{_id:"$pat.city",totalBill:{$sum:"$bill_amount"}}},
{$sort:{totalBill:-1}},
{$limit:1}
]);

//56
db.appointments.aggregate([
{$lookup:{from:"doctors",localField:"doctor_id",foreignField:"doctor_id",as:"doc"}},
{$unwind:"$doc"},
{$group:{_id:"$doc.specialization",avgBill:{$avg:"$bill_amount"}}},
{$sort:{avgBill:-1}},
{$limit:1}
]);