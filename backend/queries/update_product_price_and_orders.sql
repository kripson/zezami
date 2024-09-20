 



-- Update a product's price and reflect that in all current orders
-- Note: This assumes you have a specific product_id and new_price
BEGIN;

-- Update the product price
UPDATE products
SET price = 99.99
WHERE product_id = 2;

-- Update the price in all current orders
UPDATE orderitems oi
SET unit_price = 99.99
WHERE oi.product_id = 2
  AND oi.order_id IN (
    SELECT order_id
    FROM orders
    WHERE status = 'pending' OR status = 'processing'
  );

-- Recalculate the total amount for affected orders
UPDATE orders o
SET total_amount = (
    SELECT SUM(oi.quantity * oi.unit_price)
    FROM orderitems oi
    WHERE oi.order_id = o.order_id
)
WHERE o.order_id IN (
    SELECT DISTINCT oi.order_id
    FROM orderitems oi
    WHERE oi.product_id = 2
      AND (o.status = 'pending' OR o.status = 'processing')
);

COMMIT;