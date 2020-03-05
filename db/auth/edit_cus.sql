UPDATE customers
  SET
    username = ${username},
    email = ${email}
  WHERE cus_id = ${id}
RETURNING cus_id, email, username
;