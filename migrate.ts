import dbPromise from "./src/lib/db";

async function migrate() {
  const db = await dbPromise;

  await db.exec(`
    -- جدول آرشیو مراسم
    CREATE TABLE IF NOT EXISTS archives (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      title            TEXT    NOT NULL,
      summary          TEXT,
      description      TEXT,
      event_date       DATETIME,                   -- نوع DATETIME برای تاریخ برگزاری
      location         TEXT,
      status           TEXT    DEFAULT 'draft',
      slug             TEXT    UNIQUE,             -- URL‑پسند
      cover_image_url  TEXT,
      created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- ایندکس روی ستون slug
    CREATE INDEX IF NOT EXISTS idx_archives_slug ON archives(slug);

    -- جدول پست‌ها (بلاگ/اطلاعیه‌ها)
    CREATE TABLE IF NOT EXISTS posts (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      title            TEXT    NOT NULL,
      summary          TEXT,
      content          TEXT    NOT NULL,
      cover_image_url  TEXT,
      published_date   DATETIME NOT NULL,          -- نوع DATETIME برای تاریخ انتشار
      author_name      TEXT    NOT NULL,
      status           TEXT    DEFAULT 'draft',
      slug             TEXT    UNIQUE,
      created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

    -- جدول اطلاعات اشخاص (سخنرانان/مداحان)
    CREATE TABLE IF NOT EXISTS persons (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name   TEXT    NOT NULL,
      role        TEXT    CHECK(role IN ('speaker','reciter')) NOT NULL,
      avatar_url  TEXT,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- جدول واسط برای نگهداری نقش هر شخص در آرشیو
    CREATE TABLE IF NOT EXISTS participants (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      archive_id  INTEGER NOT NULL,
      person_id   INTEGER NOT NULL,
      FOREIGN KEY (archive_id) REFERENCES archives(id),
      FOREIGN KEY (person_id)  REFERENCES persons(id)
    );

    -- جدول پیام‌های تماس با ما
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT,
      message     TEXT    NOT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- جدول ادمین‌ها
    CREATE TABLE IF NOT EXISTS admins (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT    NOT NULL UNIQUE,
      password_hash TEXT    NOT NULL
    );

    -- جدول تصاویر
    CREATE TABLE IF NOT EXISTS images (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      archive_id  INTEGER,
      post_id     INTEGER,
      url         TEXT    NOT NULL,
      alt         TEXT,
      FOREIGN KEY (archive_id) REFERENCES archives(id),
      FOREIGN KEY (post_id)    REFERENCES posts(id)
    );

    -- جدول صوت‌ها
    CREATE TABLE IF NOT EXISTS audios (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      archive_id  INTEGER,
      post_id     INTEGER,
      url         TEXT    NOT NULL,
      title       TEXT,
      FOREIGN KEY (archive_id) REFERENCES archives(id),
      FOREIGN KEY (post_id)    REFERENCES posts(id)
    );

    -- جدول ویدیوها
    CREATE TABLE IF NOT EXISTS videos (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      archive_id  INTEGER,
      post_id     INTEGER,
      url         TEXT    NOT NULL,
      title       TEXT,
      FOREIGN KEY (archive_id) REFERENCES archives(id),
      FOREIGN KEY (post_id)    REFERENCES posts(id)
    );

    -- جدول نظرات (الزام به لینک شدن به آرشیو یا پست)
    CREATE TABLE IF NOT EXISTS comments (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      archive_id  INTEGER,
      post_id     INTEGER,
      name        TEXT,
      content     TEXT    NOT NULL,
      approved    INTEGER DEFAULT 0,
      reply       TEXT,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (archive_id) REFERENCES archives(id),
      FOREIGN KEY (post_id)    REFERENCES posts(id),
      CHECK (
        (archive_id IS NOT NULL AND post_id IS NULL)
        OR
        (archive_id IS NULL     AND post_id IS NOT NULL)
      )
    );

    CREATE TABLE IF NOT EXISTS sliders (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       image_url TEXT NOT NULL,
       link_url TEXT,
       alt TEXT,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

  `);

  console.log("✅ Database migrated successfully with the new schema.");
  await db.close();
}

migrate();
