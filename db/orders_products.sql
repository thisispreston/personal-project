INSERT INTO order_products (
  order_id,
  cart
) VALUES (
  $1,
  ARRAY $2
);