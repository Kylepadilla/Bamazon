DROP DATABASE IF EXISTS bam_db;
CREATE DATABASE bam_db;

USE bam_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price FLOAT(10,2) NOT NULL,
    weightKg FLOAT(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, weightKg, stock_quantity)
VALUES ("Iphone x", "electronics", 1200, .143, 10),
        ("Xbox one x", "electronics", 400, 38.10, 5),
        ("Dell 17r4 alienware laptop", "electronics", 2400, 42.00, 2),
        ("CORSAIR K70 RGB MK.2 Mechanical Gaming Keyboard", "electronics", 129.99, 1.25, 6),
        ("CORSAIR M65 Pro RGB - FPS Gaming Mouse", "electronics", 700, 0.17, 1),
        ("Acoustic foam tiles soundproofing foam panels", "homegoods", 18.99, .41, 5),
        ("Level 20 RGB & Level 20 GT BattleStation Gaming Desks", "homegoods", 700.00, 140.2, 8),
        ("shovel", "outdoors", 34, 12, 12),
        ("lawnmower", "outdoors", 5000, 14000, 5),
        ("mens hat", "clothing", 25, .7, 10),
        ("t-shirt", "clothing", 35, .7, 25),
        ("coat", "clothing", 200, 1, 2);


CREATE TABLE department(
    departmeant_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT (255) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM department;

INSERT INTO department(department_name, over_head_costs)
VALUES ("electronics", $25,000),
        ("homegoods", $40,000),
        ("Clothing", $14,00);

