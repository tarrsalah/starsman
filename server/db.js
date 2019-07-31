export async function storeUser(db, user) {
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

export async function starRopository(db, userId, repoId) {
  try {
    db.exec("BEGIN TRANSACTION");
    await db.exec(
      `insert or ignore into stars(user_id, repo_id) values ("${userId}", "${repoId}")`
    );
    await db.exec(
      `update stars set timestamp=datetime("now") where user_id="${userId}" and repo_id="${repoId}"`
    );
    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
  }
}
