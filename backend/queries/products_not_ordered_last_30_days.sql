 -- Retrieve a list of products not ordered in the last 30 days
SELECT p.product_id, p.name
FROM products p
WHERE p.product_id NOT IN (
    SELECT DISTINCT oi.product_id
    FROM orderitems oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_date >= CURRENT_DATE - INTERVAL 30 day
);