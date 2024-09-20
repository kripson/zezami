-- Seed Customers table
INSERT INTO Customers (first_name, last_name, email, password) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password789');

-- Seed Products table
INSERT INTO Products (name, description, price, stock_quantity) VALUES
('Product A', 'Description for Product A', 19.99, 100),
('Product B', 'Description for Product B', 29.99, 200),
('Product C', 'Description for Product C', 39.99, 150),
('Product D', 'Description for Product D', 79.99, 350);


-- Seed Orders table
INSERT INTO Orders (customer_id, total_amount, status) VALUES
(1, 59.97, 'pending'),
(2, 29.99, 'pending'),
(1, 39.99, 'pending');

-- Seed OrderItems table
INSERT INTO OrderItems (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 3, 19.99),
(2, 2, 1, 29.99),
(3, 3, 1, 39.99);


