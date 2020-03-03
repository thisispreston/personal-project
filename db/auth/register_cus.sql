INSERT INTO customers (
  username,
  password,
  email
) VALUES (
  ${username},
  ${hash},
  ${email}
)
RETURNING cus_id, email, username
;