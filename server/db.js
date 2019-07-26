import sqlite from "sqlite";

const db = Promise.resolve()
  .then(() => sqlite.open("./database.sqlite", { Promise }))
  .then(db =>
    db.migrate({ force: "last", migrationsPath: "./server/migrations" })
  );

export async function storeUser(user) {
  try {
    let con = await db;
    await con.run(
      `insert into users(username, github_id) values
        ("${user.username}", "${user.github_id}")`
    );
  } catch (err) {
    console.log(err);
    throw new Error(`Cant insert the user with the usernam ${user.username}`);
  }
}
