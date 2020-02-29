INSERT INTO cart
    (product_id,session_id,product_name,product_price,product_img, product_quantity, product_size, product_category)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);
