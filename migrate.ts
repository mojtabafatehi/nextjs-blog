/*
import dbPromise from "./src/lib/db";

async function migrate() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      status TEXT DEFAULT 'draft', -- 'draft' | 'published'
      event_date TEXT,
      speakers TEXT,
      location TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      url TEXT,
      alt TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      url TEXT,
      title TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      url TEXT,
      title TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      name TEXT,
      content TEXT NOT NULL,
      approved INTEGER DEFAULT 0, -- 0 = منتظر تأیید، 1 = تأیید شده
      reply TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
  `);

  console.log("✅ All tables created successfully!");
  await db.close();
}

migrate();
*/



import dbPromise from "@/lib/db";

async function migrate() {
  const db = await dbPromise;

  // اضافه کردن ستون جدید در صورت نبودن
  const columns = await db.all("PRAGMA table_info(posts)");
  const hasCoverImageColumn = columns.some((col) => col.name === "cover_image_url");

  if (!hasCoverImageColumn) {
    await db.exec(`ALTER TABLE posts ADD COLUMN cover_image_url TEXT;`);
    console.log("ستون cover_image_url با موفقیت اضافه شد.");
  } else {
    console.log("ستون cover_image_url از قبل وجود دارد.");
  }

  // سایر ساختارهای جدول هم می‌تونی اینجا اضافه یا بررسی کنی
}

migrate();
