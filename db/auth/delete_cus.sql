DELETE FROM cart
    WHERE cus_id = $1
;

DELETE FROM customers
    WHERE cus_id = $1
;