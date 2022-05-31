-- const list= [
--   {
--     id: 1,
--     quantity: 2,
--     purchaseDate: '2022-05-29',
--     bestBefore: '2022-06-02',
--     item_id: 2,
--     fridge_id: 1,
--   },
--   {
--     id: 2,
--     quantity: 1,
--     purchaseDate: '2022-05-20',
--     bestBefore: '2022-06-20',
--     item_id: 3,
--     fridge_id: 2,
--   },
-- ];


INSERT INTO
    "list" (id, quantity, purchaseDate, bestBefore, item_id, fridge_id)
VALUES (1, 2, '2022-05-29','2022-06-02', 2, 1);

INSERT INTO
    "list" (id, quantity, purchaseDate, bestBefore, item_id, fridge_id)
VALUES (2, 1, '2022-05-20','2022-06-20', 3, 2);