CREATE TABLE customers (
    cus_id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    email VARCHAR(100),
    password VARCHAR(150)
);

CREATE TABLE products (
    prod_id SERIAL PRIMARY KEY,
    img TEXT,
    price INT,
    name VARCHAR(50),
    description VARCHAR(250)
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    cus_id INT REFERENCES customers(cus_id),
    prod_id INT REFERENCES products(prod_id)
);
