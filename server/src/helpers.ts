import { client } from "./db/db";
interface DBUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const getUserWithEmail = (email: string) => {
  let exist: boolean;
  const search = email.toLowerCase();
  return client
    .query(
      `select * from "user"
  where email=$1 `,
      [search]
    )
    .then((res) => {
      console.log(res.rows);
      exist = res.rows.length > 0 ? true : false;
      return exist;
    });
};

export const getUserWithName = (name: string) => {
  let exist: boolean;
  return client
    .query(
      `select * from "user"
    where name=$1 `,
      [name]
    )
    .then((res) => {
      console.log(res.rows);
      exist = res.rows.length > 0 ? true : false;
      return exist;
    });
};
