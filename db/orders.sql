INSERT INTO orders (
  cus_id,
  order_total,
  stripe_fingerprint
) VALUES (
  $1,
  $2,
  $3
)
RETURNING order_id
;