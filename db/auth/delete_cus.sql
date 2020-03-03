DELETE customers
WHERE cus_id = $1
RETURNING "Customer deleted"
;