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
const createUser = db.prepare(`
INSERT INTO users (name, email, password,displayName) VALUES (?,?,?,?)
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
const createComment = db.prepare(`
INSERT INTO comments (body, createdDate, userId, postId) VALUES(?,?,?,?);
`);
const getAllPosts = db.prepare(`
SELECT * from posts;
`);
const getPostById = db.prepare(`
SELECT * from posts Where id = ?;
`);
const createPost = db.prepare(`
INSERT INTO posts (title, body, createdDate, userId, subredditId) VALUES(?,?,?,?,?);
`);
const getAllSubreddits = db.prepare(`
SELECT * from subreddits;
`);
const getSubredditById = db.prepare(`
SELECT * from subreddits WHERE id = ?;
`);
const getPostsBySubredditId = db.prepare(`
SELECT * from posts WHERE subredditId = ?
`);
const createSubreddit = db.prepare(`
INSERT INTO subreddits (name) VALUES(?);
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
app.post("/users", (req, res) => {
  const { name, email, password, displayName } = req.body;

  const errors = [];

  if (typeof name !== "string") errors.push("Name is missing or not a string!");
  if (typeof email !== "string")
    errors.push("Email is missing or not a string!");
  if (typeof password !== "string")
    errors.push("Password is missing or not a string!");
  if (typeof displayName !== "string")
    errors.push("DisplayName is missing or not a string!");

  if (errors.length === 0) {
    const result = createUser.run(name, email, password, displayName);
    const user = getUserById.get(result.lastInsertRowid);
    res.send(user);
  } else {
    res.status(406).send(errors);
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
app.post("/comments", (req, res) => {
  const { body, createdDate, userId, postId } = req.body;
  const errors = [];

  if (typeof body !== "string") errors.push("Body is missing or not a string!");
  if (typeof createdDate !== "string")
    errors.push("createdDate is missing or not a string!");
  if (typeof userId !== "number")
    errors.push("userId is missing or not a number!");
  if (typeof postId !== "number")
    errors.push("postId is missing or not a number!");

  if (errors.length === 0) {
    const result = createComment.run(body, createdDate, userId, postId);
    const comment = getCommentById.get(result.lastInsertRowid);
    res.send(comment);
  } else {
    res.status(406).send(errors);
  }
});
app.get("/posts", (req, res) => {
  const posts = getAllPosts.all();

  for (const post of posts) {
    const user = getUserById.get(post.userId);
    post.postedByUser = user;
    const subreddit = getSubredditById.get(post.subredditId);
    post.subreddit = subreddit;
  }
  res.send(posts);
});
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = getPostById.get(id);
  if (post) {
    const user = getUserById.get(post.userId);
    post.postedByUser = user;
    const subreddit = getSubredditById.get(post.subredditId);
    post.subreddit = subreddit;
    res.send(post);
  } else {
    res.send({ error: "Post doesnt exists" });
  }
});
app.post("/posts", (req, res) => {
  const { title, body, createdDate, userId, subredditId } = req.body;
  const errors = [];

  if (typeof title !== "string")
    errors.push("title is missing or not a string!");
  if (typeof body !== "string") errors.push("body is missing or not a string!");
  if (typeof createdDate !== "string")
    errors.push("createdDate is missing or not a string!");
  if (typeof userId !== "number")
    errors.push("userId is missing or not a number!");
  if (typeof subredditId !== "number")
    errors.push("subredditId is missing or not a number!");

  if (errors.length === 0) {
    const result = createPost.run(
      title,
      body,
      createdDate,
      userId,
      subredditId
    );
    const post = getPostById.get(result.lastInsertRowid);
    res.send(post);
  } else {
    res.status(406).send(errors);
  }
});
app.get("/subreddits", (req, res) => {
  const subreddits = getAllSubreddits.all();

  for (const subreddit of subreddits) {
    const posts = getPostsBySubredditId.all(subreddit.id);
    for (const post of posts) {
      const user = getUserById.get(post.userId);
      post.user = user;
    }
    subreddit.posts = posts;
  }
  res.send(subreddits);
});
app.get("/subreddits/:id", (req, res) => {
  const id = req.params.id;
  const subreddit = getSubredditById.get(id);
  if (subreddit) {
    const posts = getPostsBySubredditId.all(subreddit.id);
    for (const post of posts) {
      const user = getUserById.get(post.userId);
      post.user = user;
    }
    subreddit.posts = posts;
    res.send(subreddit);
  } else {
    res.send({ error: "Subreddit doesnt exists" });
  }
});
app.post("/subreddits", (req, res) => {
  const { name } = req.body;
  const errors = [];

  if (typeof name !== "string") errors.push("name is missing or not a string!");

  if (errors.length === 0) {
    const result = createSubreddit.run(name);
    const subreddit = getSubredditById.get(result.lastInsertRowid);
    res.send(subreddit);
  } else {
    res.status(406).send(errors);
  }
});
//#endregion

app.listen(PORT, () => {
  console.log(`Server up and running: http://localhost:${PORT}`);
});
