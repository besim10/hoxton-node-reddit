CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "subreddit" (
  "id" integer PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "voted" integer,
  "createdDate" text NOT NULL,
  "userId" integer NOT NULL,
  "subredditId" integer NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  FOREIGN KEY ("subredditId") REFERENCES "subreddit" ("id");
);

CREATE TABLE "comments" (
  "id" integer PRIMARY KEY,
  "body" text NOT NULL,
  "voted" integer,
  "createdDate" text NOT NULL,
  "userId" integer NOT NULL,
  "postId" integer NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  FOREIGN KEY ("postId") REFERENCES "posts" ("id");

);

-- ALTER TABLE "posts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

-- ALTER TABLE "posts" ADD FOREIGN KEY ("subredditId") REFERENCES "subreddit" ("id");

-- ALTER TABLE "comments" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

-- ALTER TABLE "comments" ADD FOREIGN KEY ("postId") REFERENCES "posts" ("id");
