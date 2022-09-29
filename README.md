# Smart Kitchen

SmartKitchen is a full-stack application where users can record and manage the foods in their refrigerators. After logging into the system, users are able to record the foods they purchased and check the freshness of the foods. This application helps users keep track of their refrigerators and consume foods in time. 

## Deployed Application

https://master--glittery-churros-4244dc.netlify.app/

## Product Description
- Users need to first create their accounts and log into the app.

!["Screenshot of login"](https://github.com/lalalalyt/SmartKitchen/blob/main/client/public/screenshots/login.png?raw=true)


- After logging into their accounts, users can see a list of refrigerators that have been added and add a new refrigerator at any time.

!["Screenshot of homepage"](https://github.com/lalalalyt/SmartKitchen/blob/main/client/public/screenshots/homePage.png?raw=true)

- Clicking the refrigerator that they want to check, users will see a list of items in that fridge. All the information about the foods will be shown. 

!["Screenshot of tableView"](https://github.com/lalalalyt/SmartKitchen/blob/main/client/public/screenshots/tableView.png?raw=true)

- Users are free to add new items. When adding new food, users need to select the category that the food belongs to, such as fruid, vegetable, and meat. Then, they need to enter the name, quantity, purchasing date, and best before date of the item.
- By fault, The date of the adding date (today) will be used as the puchasing date. 
- For the foods that have ever been added, the app will suggest a best before date according to the previous record.

!["Screenshot of addFood"](https://github.com/lalalalyt/SmartKitchen/blob/main/client/public/screenshots/addFood.png?raw=true)

- Users can manage the foods in their fridge easily. 

!["Screenshot of editTable"](https://github.com/lalalalyt/SmartKitchen/blob/main/client/public/screenshots/editTable.png?raw=true)


## Setup

Install dependencies with `npm install`.


## Run Server

Under the directory of server

```sh
npm run dev
```

## Run Client

Under the directory of client
```sh
npm start
```
