-- ============================================================
-- Capstone Project: Personal Expense Monitoring System
-- Week 1 - MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS expense_monitor;
USE expense_monitor;


-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id     INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    email       VARCHAR(150)        NOT NULL UNIQUE,
    created_at  DATETIME            DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    category_id   INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100)      NOT NULL UNIQUE,
    description   VARCHAR(255)
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    expense_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT                NOT NULL,
    category_id   INT                NOT NULL,
    amount        DECIMAL(10, 2)     NOT NULL,
    expense_date  DATE               NOT NULL,
    description   VARCHAR(255),
    created_at    DATETIME           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)     REFERENCES users(user_id)         ,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) 
);



INSERT INTO users (name, email) VALUES
    ('Alice John', 'alice@example.com'),
    ('Bob Smith',     'bob@example.com');

INSERT INTO categories (category_name, description) VALUES
    ('Food',          'Groceries, restaurants, takeout'),
    ('Transport',     'Fuel, bus, metro, cab fares'),
    ('Utilities',     'Electricity, water, internet'),
    ('Entertainment', 'Movies, games, subscriptions'),
    ('Health',        'Medicine, doctor visits, gym');

INSERT INTO expenses (user_id, category_id, amount, expense_date, description) VALUES
    (1, 1, 150.00, '2025-04-02', 'Grocery shopping'),
    (1, 2,  45.00, '2025-04-05', 'Monthly bus pass'),
    (1, 3, 120.00, '2025-04-10', 'Electricity bill'),
    (1, 4,  30.00, '2025-04-15', 'Netflix subscription'),
    (1, 1,  80.00, '2025-04-20', 'Restaurant dinner'),
    (2, 2,  60.00, '2025-04-03', 'Cab rides'),
    (2, 5, 200.00, '2025-04-08', 'Doctor visit'),
    (2, 1, 110.00, '2025-04-12', 'Weekly groceries'),
    (2, 4,  15.00, '2025-04-18', 'Movie tickets'),
    (2, 3,  90.00, '2025-04-25', 'Internet bill');


-- CREATE
INSERT INTO expenses (user_id, category_id, amount, expense_date, description)
VALUES (1, 5, 75.00, '2025-04-28', 'Gym membership');

-- READ
SELECT * from users;
select * from categories;
select * from expenses;
SELECT
    e.expense_id,
    u.name          AS user_name,
    c.category_name,
    e.amount,
    e.expense_date,
    e.description
FROM expenses e
JOIN users u      ON e.user_id     = u.user_id
JOIN categories c ON e.category_id = c.category_id
WHERE u.user_id = 1
ORDER BY e.expense_date;

-- UPDATE
UPDATE expenses
SET amount = 160.00, description = 'Updated grocery shopping'
WHERE expense_id = 1;

-- DELETE
DELETE FROM expenses
WHERE expense_id = 10;

--  PROCEDURE


DELIMITER $$

CREATE PROCEDURE GetMonthlyExpensesByCategory(
    IN p_user_id INT,
    IN p_year    INT,
    IN p_month   INT
)
BEGIN
    SELECT
        c.category_name,
        SUM(e.amount)                               AS total_spent,
        COUNT(e.expense_id)                         AS num_transactions,
        ROUND(AVG(e.amount), 2)                     AS avg_per_transaction,
        CONCAT(p_year, '-', LPAD(p_month, 2, '0'))  AS period
    FROM expenses e
    JOIN categories c ON e.category_id = c.category_id
    WHERE
        e.user_id       = p_user_id
        AND YEAR(e.expense_date)  = p_year
        AND MONTH(e.expense_date) = p_month
    GROUP BY c.category_name
    ORDER BY total_spent DESC;
END$$

DELIMITER ;


CALL GetMonthlyExpensesByCategory(1, 2025, 4);



