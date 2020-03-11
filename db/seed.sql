CREATE TABLE customers (
    cus_id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    email VARCHAR(100),
    password VARCHAR(150)
);

CREATE TABLE products (
    prod_id SERIAL PRIMARY KEY,
    img VARCHAR(250),
    price INT,
    name VARCHAR(50),
    description VARCHAR(250),
    category VARCHAR(25),
    artist_name VARCHAR(50)
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    cus_id INT REFERENCES customers(cus_id) NOT NULL,
    prod_id INT REFERENCES products(prod_id) NOT NULL
);

INSERT INTO products (
    img,
    price,
    name,
    category,
    artist_name
) VALUES (
    '/assets/product-animals-01.jpg',
    15,
    'Puppy',
    'Animals',
    'ractapopulous'
)
INSERT INTO products (
    img,
    price,
    name,
    category,
    artist_name
) VALUES (
    '/assets/product-animals-02.jpg',
    18,
    'Owl',
    'Animals',
    'ractapopulous'
),
(
    '/assets/product-animals-03.jpg',
    20,
    'Horse',
    'Animals',
    'avalonbears'
),
(
    '/assets/product-animals-04.jpg',
    20,
    'Hummingbird',
    'Animals',
    'ractapopulous'
),
(
    '/assets/product-animals-05.jpg',
    30,
    'Japanese Hawk',
    'Animals',
    'Prawny'
),
(
    '/assets/product-animals-06.jpg',
    22,
    'Moth',
    'Animals',
    'Nika_Akin'
)
;

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    cus_id INT REFERENCES customers(cus_id) NOT NULL,
    order_total INT NOT NULL,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    stripe_fingerprint VARCHAR(250)
);

-- CREATE TABLE order_products (
--     o_p_id SERIAL PRIMARY KEY,
--     order_id INT REFERENCES orders(order_id) NOT NULL,
--     product_id INT REFERENCES products(prod_id) NOT NULL
-- );

CREATE TABLE order_products (
    o_p_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) NOT NULL,
    cart TEXT []
);