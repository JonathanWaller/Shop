UPDATE cart 
SET product_size=$2
WHERE cart_id = $1
RETURNING *;