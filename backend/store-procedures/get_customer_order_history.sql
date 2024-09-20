CREATE PROCEDURE get_customer_order_history(customer_id_param INT)

BEGIN
    SELECT 
        o.order_id,
        o.order_date,
        o.status,
        oi.product_id,
        p.name,
        oi.quantity,
        oi.unit_price
    FROM 
        orders o
    JOIN 
        orderitems oi ON o.order_id = oi.order_id
    JOIN 
        products p ON oi.product_id = p.product_id
    WHERE 
        o.customer_id = customer_id_param
    ORDER BY 
        o.order_date DESC, o.order_id;
END;

-- Example usage:
-- SELECT * FROM get_customer_order_history(1);