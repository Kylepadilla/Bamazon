DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INT(10) NOT NULL,1
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone", "electronics", 1200, 10),
        ("Xbox", "electronics", 400, 5),
        ("Dell 17", "electronics", 1600, 2),
        ("Keyboard", "electronics", 120, 6),
        ("Recliner", "homegoods", 700, 1),
        ("Towel", "homegoods", 12, 5),
        ("rake", "outdoors", 19.99, 8),
        ("shovel", "outdoors", 34, 12),
        ("lawnmower", "outdoors", 5000, 5),
        ("mens hat", "clothing", 25, 10),
        ("t-shirt", "clothing", 35, 25),
        ("coat", "clothing", 200, 2);


/* CREATE TABLE department(
    departmeant_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT (255) NOT NULL,
    PRIMARY KEY (item_id)
); */

