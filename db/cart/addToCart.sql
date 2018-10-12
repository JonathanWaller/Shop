INSERT INTO cart
    (product_id,session_id,product_name,product_price,product_img, quantity, product_size)
VALUES
    ($1, $2, $3, $4, $5, $6, $7);
