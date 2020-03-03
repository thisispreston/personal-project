UPDATE customers
  SET username = ${username},
  SET email = ${email}
  WHERE cus_id = ${cus_id}
RETURNING cus_id, email, username
;