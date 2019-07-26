export async function storeUser(db, user) {
  await db.run(
    `insert into users(username, github_id) values
        ("${user.username}", "${user.github_id}")`
  );
}
