import sqlite from "sqlite";

const dbPromise = Promise.resolve()
  .then(() => sqlite.open("./database.sqlite", { Promise }))
  .then(db =>
    db.migrate({ force: "last", migrationsPath: "./server/migrations" })
  );

export async function storeUser(user) {
  let db = await dbPromise;
  let { username, github_id } = user;
  try {
    await db.exec("BEGIN TRANSACTION;");
    await db.exec(
      `insert or ignore into users(username, github_id) values ("${username}", "${github_id}")`
    );
    await db.exec(
      `update users set timestamp=datetime("now") where username="${username}"`
    );

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
  }
}
