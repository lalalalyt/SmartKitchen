-- const list= [
--   {
--     id: 1,
--     quantity: 2,
--     purchaseDate: '2022-05-29T00:00:00Z',
--     bestBefore: '2022-06-02T00:00:00Z',
--     item_id: 2,
--     fridge_id: 1,
--   },
--   {
--     id: 2,
--     quantity: 1,
--     purchaseDate: '2022-05-20T00:00:00Z',
--     bestBefore: '2022-06-20T00:00:00Z',
--     item_id: 3,
--     fridge_id: 2,
--   },
-- ];


INSERT INTO
    "list" (id, quantity, purchaseDate, bestBefore, item_id, fridge_id)
VALUES (1, 2, '2022-05-28T00:00:00Z','2022-06-02T00:00:00Z', 2, 1);

INSERT INTO
    "list" (id, quantity, purchaseDate, bestBefore, item_id, fridge_id)
VALUES (2, 1, '2022-05-21T00:00:00Z','2022-06-20T00:00:00Z', 3, 2);