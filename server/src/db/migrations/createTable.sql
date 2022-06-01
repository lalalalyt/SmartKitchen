CREATE TABLE
    if NOT EXISTS "user" (
        id serial PRIMARY key NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    if NOT EXISTS "fridge" (
        id serial PRIMARY key NOT NULL,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        type CHAR(1) NOT NULL,
        user_id INTEGER REFERENCES "user"(id)
        ON DELETE cascade
    );

CREATE TABLE
    if NOT EXISTS "category" (
        id serial PRIMARY key NOT NULL,
        name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    if NOT EXISTS "item" (
        id serial PRIMARY key NOT NULL,
        name VARCHAR(255) NOT NULL,
        place CHAR(1) NOT NULL,
        freshDay INTEGER,
        category_id INTEGER REFERENCES "category"(id)
        ON DELETE cascade
    );

CREATE TABLE
    if NOT EXISTS "userItem" (
        id serial PRIMARY key NOT NULL,
        user_id INTEGER REFERENCES "user"(id)
        ON DELETE cascade,
        item_id INTEGER REFERENCES "item"(id)
        ON DELETE cascade
    );



CREATE TABLE
    if NOT EXISTS "list" (
        id serial PRIMARY key NOT NULL,
        quantity INTEGER,
        purchaseDate DATE,
        bestBefore DATE,
        item_id INTEGER REFERENCES "item"(id)
        ON DELETE cascade,
        fridge_id INTEGER REFERENCES "fridge"(id)
        ON DELETE cascade
    );