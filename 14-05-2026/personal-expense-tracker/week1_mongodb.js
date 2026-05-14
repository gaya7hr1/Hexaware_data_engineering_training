

use("expense_monitor");

db.receipts.drop();

db.receipts.insertMany([
  {
    user_id: 1,
    user_name: "Alice Johnson",
    expense_date: new Date("2025-04-02"),
    category: "Food",
    amount: 150.00,
    merchant: "FreshMart Superstore",
    receipt_data: {
      items: [
        { name: "Rice 5kg",       qty: 1, price: 45.00 },
        { name: "Vegetables",     qty: 1, price: 30.00 },
        { name: "Cooking Oil 1L", qty: 2, price: 25.00 },
        { name: "Milk 1L",        qty: 2, price: 12.50 },
        { name: "Bread",          qty: 1, price:  7.00 }
      ],
      subtotal: 145.00,
      tax: 5.00,
      total: 150.00,
      payment_method: "Credit Card"
    },
    notes: "Monthly grocery run. Check if rice offer continues next month.",
    scanned_at: new Date(),
    tags: ["grocery", "monthly", "essentials"]
  },
  {
    user_id: 1,
    user_name: "Alice Johnson",
    expense_date: new Date("2025-04-10"),
    category: "Utilities",
    amount: 120.00,
    merchant: "City Power Corp",
    receipt_data: {
      bill_number: "ELEC-2025-APR-001",
      units_consumed: 240,
      rate_per_unit: 0.45,
      fixed_charge: 12.00,
      tax: 0.00,
      total: 120.00,
      payment_method: "Bank Transfer"
    },
    notes: "High usage due to AC. Consider reducing usage next month.",
    scanned_at: new Date(),
    tags: ["bill", "electricity", "utility"]
  },
  {
    user_id: 1,
    user_name: "Alice Johnson",
    expense_date: new Date("2025-04-15"),
    category: "Entertainment",
    amount: 30.00,
    merchant: "Netflix",
    receipt_data: {
      plan: "Standard",
      billing_cycle: "Monthly",
      screens: 2,
      total: 30.00,
      payment_method: "Credit Card"
    },
    notes: "Auto-renewed. Review if still using it regularly.",
    scanned_at: new Date(),
    tags: ["subscription", "streaming", "entertainment"]
  },
  {
    user_id: 2,
    user_name: "Bob Smith",
    expense_date: new Date("2025-04-08"),
    category: "Health",
    amount: 200.00,
    merchant: "City Health Clinic",
    receipt_data: {
      services: [
        { name: "Consultation Fee", price: 100.00 },
        { name: "Blood Test",       price:  75.00 },
        { name: "Medicines",        price:  25.00 }
      ],
      doctor: "Dr. Priya Nair",
      total: 200.00,
      payment_method: "Cash"
    },
    notes: "Follow-up appointment scheduled for next month.",
    scanned_at: new Date(),
    tags: ["health", "doctor", "medical"]
  },
  {
    user_id: 2,
    user_name: "Bob Smith",
    expense_date: new Date("2025-04-12"),
    category: "Food",
    amount: 110.00,
    merchant: "Daily Basket",
    receipt_data: {
      items: [
        { name: "Eggs (dozen)",  qty: 2, price: 10.00 },
        { name: "Chicken 1kg",   qty: 2, price: 30.00 },
        { name: "Fruits",        qty: 1, price: 25.00 },
        { name: "Snacks",        qty: 3, price: 15.00 }
      ],
      subtotal: 105.00,
      tax: 5.00,
      total: 110.00,
      payment_method: "Debit Card"
    },
    notes: "Weekly grocery shopping.",
    scanned_at: new Date(),
    tags: ["grocery", "weekly", "food"]
  }
]);

print(" Inserted 5 receipt documents.\n");


// Index on user_id 
db.receipts.createIndex({ user_id: 1 }, { name: "idx_user_id" });

// Index on expense_date 
db.receipts.createIndex({ expense_date: -1 }, { name: "idx_expense_date" });

// Compound index: user + date 
db.receipts.createIndex(
  { user_id: 1, expense_date: -1 },
  { name: "idx_user_date" }
);

// Index on category 
db.receipts.createIndex({ category: 1 }, { name: "idx_category" });


db.receipts.createIndex(
  { notes: "text", tags: "text" },
  { name: "idx_text_search" }
);

print(" Created 5 indexes on receipts collection.\n");

print(" Indexes on receipts collection:");
printjson(db.receipts.getIndexes());

