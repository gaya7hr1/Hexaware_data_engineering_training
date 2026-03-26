CREATE DATABASE company_training;
USE company_training;
CREATE TABLE employees (
emp_id INT PRIMARY KEY,
emp_name VARCHAR(100),
department VARCHAR(50),
city VARCHAR(50)
);

CREATE TABLE projects (
project_id INT PRIMARY KEY,
emp_id INT,
project_name VARCHAR(100),
project_budget DECIMAL(12,2),
project_status VARCHAR(50)
);

INSERT INTO employees VALUES
(1, 'Rohan Mehta', 'IT', 'Hyderabad'),
(2, 'Sneha Iyer', 'IT', 'Bangalore'),
(3, 'Kiran Patel', 'Finance', 'Mumbai'),
(4, 'Ananya Das', 'HR', NULL),
(5, 'Rahul Sharma', 'IT', 'Delhi'),
(6, NULL, 'Marketing', 'Chennai');

INSERT INTO projects VALUES
(101, 1, 'AI Chatbot', 120000, 'Active'),
(102, 1, 'ML Prediction', 90000, 'Active'),
(103, 2, 'Data Warehouse', 150000, 'Active'),
(104, 3, 'Financial Dashboard', 80000, 'Completed'),
(105, NULL, 'Website Revamp', 60000, 'Pending'),
(106, 8, 'Mobile App', 100000, 'Active');
-- 1.
SELECT e.emp_name, p.project_name, p.project_budget
from employees e
inner join projects p on e.emp_id = p.emp_id;
-- 2.
select e.emp_id, e.emp_name,e.department,e.city, p.project_name
from employees e
left join projects p on e.emp_id = p.emp_id;
-- 3. 
select e.emp_name, p.project_name
from projects p
left join employees e on e.emp_id = p.emp_id;
-- 4.
select *  from employees e
left join projects p on e.emp_id = p.emp_id
UNION
select * from employees e
right join projects p on e.emp_id = p.emp_id;

-- 5
select e.emp_name, p.project_name
from employees e
cross join projects p;
-- 6
select e.department, p.project_name
from employees e
join projects p on e.emp_id = p.emp_id
where e.department = 'IT';
-- 7.
select project_name, project_budget
from projects
where project_budget > 100000;
-- 8.
select e.emp_name, p.project_name
from  employees e
join projects p on e.emp_id = p.emp_id
where e.city = 'Hyderabad';
-- 9.
select e.emp_name, count(p.project_id) as total_projects
from employees e
join projects p on e.emp_id = p.emp_id
group by e.emp_name;
-- 10. 
SELECT e.emp_name, sum(p.project_budget) as total_budget
FROM employees e
join projects p on e.emp_id = p.emp_id
group by e.emp_name;
-- 11.
select e.department, avg(p.project_budget) as avg_budget
from employees e
join projects p on e.emp_id = p.emp_id
group by e.department;
-- 12
select department, count(*) as total_projects
from employees e
join projects p on e.emp_id = p.emp_id
group by department; 
-- 13
SELECT e.department, sum(p.project_budget) AS total_budget
FROM employees e
JOIN projects p ON e.emp_id = p.emp_id
GROUP BY e.department;
-- 14.
select city, count(*) AS total_employees
from employees
group by city;
-- 15
select e.emp_name from employees e
join projects p on e.emp_id = p.emp_id
group by e.emp_name
having count(p.project_id) > 1;
-- 16.
select e.department, sum(p.project_budget) AS total_budget
from employees e
join projects p on e.emp_id = p.emp_id
group by e.department
having sum(p.project_budget) > 150000;
-- 17
select e.emp_name, sum(p.project_budget) as total_budget
from employees e
join projects p on e.emp_id = p.emp_id
group by e.emp_name
having sum(p.project_budget) > 100000;

-- capsstone query 
select e.emp_name, e.department, sum(p.project_budget) as total
from employees e
join projects p on e.emp_id = p.emp_id
group by e.emp_name, e.department
having sum(p.project_budget) > 100000
order by total desc;


