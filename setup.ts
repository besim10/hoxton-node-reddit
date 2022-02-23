import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const users = [
  {
    username: "besim",
    password: "besim123",
  },
  {
    username: "nicolas",
    password: "nicolas123",
  },
  {
    username: "ed",
    password: "ed123",
  },
  {
    username: "arita",
    password: "arita123",
  },
];
const subreddits = [
  {
    name: "AskBalkans",
  },
  {
    name: "AskReddit",
  },
  {
    name: "nba",
  },
  {
    name: "Kosova",
  },
];

const posts = [
  {
    title: "There's a whole bunch of brothers in the nba right now",
    body: "Ball family, Antetokounmpos, Wagners, McDaniels, Martin twins, Morris twins, Seth and Steph, Lopez twins, all the Holidays, and Juancho and Willy Hernangomez. Am I missing any?",
    voted: 532,
    createdDate: "23/02/2022",
    userId: 1,
    subredditId: 3,
  },
  {
    title: "Kosova me zero raste te COVI19",
    body: "Pas më shumë se dy muaj, sot kemi pase 0 raste pozitive me Covid-19. E asnjëherë nuk duhet të ndalemi të falenderojmë të gjithë ata që u angazhuan për këtë ❤️",
    voted: 1,
    createdDate: "01/05/2020",
    userId: 4,
    subredditId: 4,
  },
  {
    title: "Diasporë, po ju presim krahëhapur ❤️",
    body: "https://preview.redd.it/7fcivpesut051.jpg?width=960&crop=smart&auto=webp&s=a6669bef2cb1163c0a5e0208243f4ab22df4d80b",
    voted: 1,
    createdDate: "14/02/2020",
    userId: 2,
    subredditId: 4,
  },
  {
    title:
      "If everyone got to see 'life stats' after they died, what would be the first thing you would check?",
    body: "",
    voted: 11100,
    createdDate: "22/02/2022",
    userId: 3,
    subredditId: 2,
  },
  {
    title: "What are some popular alcohol accompaniments from your country?",
    body: "https://preview.redd.it/qd1rt34gvkj81.jpg?width=640&crop=smart&auto=webp&s=2e2f9f6553e0b1c9b74961ef46bc730cc71a211a",
    voted: 66,
    createdDate: "",
    userId: 1,
    subredditId: 1,
  },
  {
    title: "Megathread: Russia-Ukraine Conflict",
    body: "So to keep things better organised and quite frankly make our job easier, we decided to open up a megathread regarding the current situation in the Ukraine. Please don't open up new posts regarding this topic because we will start to remove them, talk about and discuss this topic on this thread. PS: We'll try to add daily edits on this thread regarding breaking news etc. Cheers from the Mod-Team",
    voted: 44,
    createdDate: "23/02/2022",
    userId: 4,
    subredditId: 1,
  },
  {
    title:
      " Townsend On dfwticket, Mark Cuban says he believes Luka Doncic was humbled by criticism of his weight and not being voted an All-Star starter, leading to change of diet and increased workouts. It finally clicked in that there s a level of discipline involved.",
    body: "On @dfwticket, Mark Cuban says he believes Luka Doncic was humbled by criticism of his weight and not being voted an All-Star starter, leading to change of diet and increased workouts. It finally clicked in that there's a level of discipline involved.",
    voted: 6000,
    createdDate: "22/02/2022",
    userId: 2,
    subredditId: 3,
  },
];
const comments = [
  {
    body: "Twitter: fat, Luka: >:(",
    voted: 4400,
    createdDate: "22/02/2022",
    userId: 1,
    postId: 7,
  },
  {
    body: "i hope i am too tall for conscription",
    voted: 5,
    createdDate: "23/02/2022",
    userId: 2,
    postId: 6,
  },
  {
    body: "Melon and white cheese(preferibly ezine) with raki",
    voted: 13,
    createdDate: "23/02/2022",
    userId: 4,
    postId: 5,
  },
  {
    body: "How many times I should've died and didn't, or 'near-deaths' that I was unaware of.",
    voted: 1300,
    createdDate: "22/02/2022",
    userId: 2,
    postId: 4,
  },
  {
    body: "I think there is a minimum limit for most armies but not a maximum limit, unless you want to become a tanker, submariner or a pilot. You'll fit right in the frontlines my friend :)",
    voted: 5,
    createdDate: "23/02/2022",
    userId: 3,
    postId: 6,
  },
  {
    body: "Bought the Annihilator, Lee Enfield, and MG08 skins (despite there being upcoming skins in R2BFV), the Company K skin will get me to use the Lee Enfield more for sure.",
    voted: 3,
    createdDate: "23/02/2022",
    userId: 4,
    postId: 1,
  },
  {
    body: "Finally one for the Annihilator, YES!",
    voted: 2,
    createdDate: "23/02/2022",
    userId: 2,
    postId: 1,
  },
];

db.exec(`
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS subreddits;


    CREATE TABLE IF NOT EXISTS "users" (
    "id" integer PRIMARY KEY,
    "username" text NOT NULL,
    "password" text NOT NULL
    );
  
    CREATE TABLE IF NOT EXISTS "subreddits" (
    "id" integer PRIMARY KEY,
    "name" text NOT NULL
    );
  
  CREATE TABLE IF NOT EXISTS "posts" (
    "id" integer PRIMARY KEY,
    "title" text NOT NULL,
    "body" text NOT NULL,
    "voted" integer,
    "createdDate" text NOT NULL,
    "userId" integer NOT NULL,
    "subredditId" integer NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id"),
    FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id")
  );
  
  CREATE TABLE IF NOT EXISTS "comments" (
    "id" integer PRIMARY KEY,
    "body" text NOT NULL,
    "voted" integer,
    "createdDate" text NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id"),
    FOREIGN KEY ("postId") REFERENCES "posts" ("id")
    );
  
`);
const createUser = db.prepare(`
INSERT INTO users (username, password) VALUES (?,?);
`);
const createSubreddit = db.prepare(`
INSERT INTO subreddits (name) VALUES (?);
`);
const createPost = db.prepare(`
INSERT INTO posts (title, body, voted, createdDate, userId, subredditId) VALUES (?,?,?,?,?,?);
`);
const createComment = db.prepare(`
INSERT INTO comments (body, voted, createdDate, userId, postId) VALUES (?,?,?,?,?);
`);
for (const user of users) {
  createUser.run(user.username, user.password);
}
for (const subreddit of subreddits) {
  createSubreddit.run(subreddit.name);
}

for (const post of posts) {
  createPost.run(
    post.title,
    post.body,
    post.voted,
    post.createdDate,
    post.userId,
    post.subredditId
  );
}

for (const comment of comments) {
  createComment.run(
    comment.body,
    comment.voted,
    comment.createdDate,
    comment.userId,
    comment.postId
  );
}
