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