SELECT SUM(o.total_amount), o.customer_id, c.first_name, c.last_name 
from orders as o
join customers as c on c.customer_id = o.customer_id 
group by o.customer_id