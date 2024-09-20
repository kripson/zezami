 -- Retrieve all orders and their associated customer details
SELECT o.order_id, o.order_date, o.total_amount,
       c.customer_id, c.first_name, c.last_name, c.email
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;