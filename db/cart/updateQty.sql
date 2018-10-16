UPDATE cart 
SET product_quantity=$2
WHERE cart_id = $1
RETURNING *;