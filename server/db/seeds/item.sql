-- const item = [
--   {
--     id: 1,
--     name: "apple",
--     place: "R",
--     freshDay: 15,
--     categoryId: 1,
--   },
--   {
--     id: 2,
--     name: "beef",
--     place: "R",
--     freshDay: 3,
--     categoryId: 2,
--   },
--   {
--     id: 3,
--     name: "beef",
--     place:  "F",
--     freshDay: 30,
--     categoryId: 2,
--   },
--   {
--     id: 4,
--     name: "milk",
--     place: "R",
--     freshDay: 60,
--     categoryId: 4,
--   },
-- ];
INSERT INTO
    "item" (id, name, place, freshDay, category_id)
VALUES (1, 'apple', 'R', 15, 1);

INSERT INTO
    "item" (id, name, place, freshDay, category_id)
VALUES (2, 'beef', 'R', 3, 2);

INSERT INTO
    "item" (id, name, place, freshDay, category_id)
VALUES (3, 'beef', 'F', 30, 2);

INSERT INTO
    "item" (id, name, place, freshDay, category_id)
VALUES (4, 'milk', 'R', 60, 4);