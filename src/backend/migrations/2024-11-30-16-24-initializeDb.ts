import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"

export const migration = {
  id: "2024-11-30-16-24-initializeDb",
  up: async (connection: SqliteConnection) => {
    await connection.run(sql`
      CREATE TABLE User (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        birthday DATE,
        passwordHash TEXT NOT NULL
      );
    `)

    await connection.run(sql`
      CREATE TABLE WishList (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        eventDate DATETIME,
        userId TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id)
      );
    `)

    await connection.run(sql`
      CREATE TABLE WishItem(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        notes TEXT,
        price REAL,
        link TEXT,
        imageUrl TEXT,
        status TEXT CHECK(status IN ('open', 'reserved', 'received')) NOT NULL DEFAULT 'open',
        mostWanted BOOLEAN NOT NULL DEFAULT 0,
        quantity INTEGER NOT NULL DEFAULT 1,
        wishListId TEXT NOT NULL,
        FOREIGN KEY (wishListId) REFERENCES wish_list(id)
      )
    `)
  },
  // DOWNS are not implemented.
  down: async (connection: SqliteConnection) => {
    await connection.run(sql`
      DROP TABLE User;
    `)

    await connection.run(sql`
      DROP TABLE WishList;
    `)

    await connection.run(sql`
      DROP TABLE WishItem;
    `)
  },
}
