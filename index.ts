import Database from "better-sqlite3";
import cors from "cors";
import express from "express";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});

//#region Sql queries

const getAllUsers = db.prepare(`
SELECT * from users;
`);

const getUserById = db.prepare(`
SELECT * from users WHERE id = ?;
`);
const getPostsByUserId = db.prepare(`
SELECT * from posts WHERE userId = ?
`);
const getAllComments = db.prepare(`
SELECT * from comments;
`);
const getCommentById = db.prepare(`
SELECT * from comments Where id = ?;
`);
const getAllPosts = db.prepare(`
SELECT * from posts;
`);
const getPostById = db.prepare(`
SELECT * from posts Where id = ?;
`);
const getAllSubreddits = db.prepare(`
SELECT * from subreddits;
`);
const getSubredditById = db.prepare(`
SELECT * from subreddits Where id = ?;
`);

//#endregion

//#region End points

app.get("/", (req, res) => {
  res.send("Welcome to our Reddit API");
});

app.get("/users", (req, res) => {
  const users = getAllUsers.all();
  for (const user of users) {
    const posts = getPostsByUserId.all(user.id);
    user.posts = posts;
  }
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = getUserById.get(id);
  if (user) {
    res.send(user);
  } else {
    res.send({ error: "User doesnt exists" });
  }
});
app.get("/comments", (req, res) => {
  const comments = getAllComments.all();
  res.send(comments);
});
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = getCommentById.get(id);
  if (comment) {
    res.send(comment);
  } else {
    res.send({ error: "Comment doesnt exists" });
  }
});
app.get("/posts", (req, res) => {
  const posts = getAllPosts.all();

  for (const post of posts) {
    const user = getUserById.get(post.userId);
    post.postedByUser = user;
  }
  res.send(posts);
});
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = getPostById.get(id);
  if (post) {
    const user = getUserById.get(post.userId);
    post.postedByUser = user;
    res.send(post);
  } else {
    res.send({ error: "Post doesnt exists" });
  }
});
app.get("/subreddits", (req, res) => {
  const subreddits = getAllSubreddits.all();
  res.send(subreddits);
});
app.get("/subreddits/:id", (req, res) => {
  const id = req.params.id;
  const subreddit = getSubredditById.get(id);
  if (subreddit) {
    res.send(subreddit);
  } else {
    res.send({ error: "Subreddit doesnt exists" });
  }
});
//#endregion

app.listen(PORT, () => {
  console.log(`Server up and running: http://localhost:${PORT}`);
});
