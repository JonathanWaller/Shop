DELETE FROM cart 
WHERE session_id = $1;
SELECT *
FROM cart;