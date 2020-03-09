SELECT cart_id, img, price, name, category, prod_id
    FROM cart c
    JOIN customers cus
    ON cus.cus_id = c.cus_id
    JOIN products p
    ON p.prod_id = c.prod_id
    WHERE c.cus_id = $1
;