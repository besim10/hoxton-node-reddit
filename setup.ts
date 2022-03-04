import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const users = [
  {
    name: "Besim",
    email: "besim@gmail.com",
    password: "besim123",
    displayName: "BeSiM",
  },
  {
    name: "Nicolas",
    email: "nicolas@gmail.com",
    password: "nicolas123",
    displayName: "Nicos",
  },
  {
    name: "Ed",
    email: "ed@gmail.com",
    password: "ed123",
    displayName: "Edinjo",
  },
  {
    name: "Arita",
    email: "arita@gmail.com",
    password: "arita123",
    displayName: "Rrita",
  },
];
const subreddits = [
  {
    name: "AskBalkans",
    background:
      "https://styles.redditmedia.com/t5_xmk1t/styles/bannerBackgroundImage_adi2xo1t19m71.png?width=4000&s=344a8481c471355f96d38999e50464098b031487",
  },
  {
    name: "AskReddit",
    background:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEVVmf9AjA9fAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC",
  },
  {
    name: "nba",
    background:
      "https://styles.redditmedia.com/t5_2qo4s/styles/bannerBackgroundImage_xx01cqppboq61.png?width=4000&s=572b302698e5908f184b98dfc7860237445eff9f",
  },
  {
    name: "Kosova",
    background:
      "https://styles.redditmedia.com/t5_2ta2i/styles/bannerBackgroundImage_86kd4qzjjez41.jpg?width=4000&format=pjpg&s=8b63dec72c412e124e094d44ab430923d86a1550",
  },
];

const posts = [
  {
    title: "There's a whole bunch of brothers in the nba right now",
    body: "Ball family, Antetokounmpos, Wagners, McDaniels, Martin twins, Morris twins, Seth and Steph, Lopez twins, all the Holidays, and Juancho and Willy Hernangomez. Am I missing any?",
    createdDate: "23/02/2022",
    userId: 1,
    subredditId: 3,
  },
  {
    title: "Kosova me zero raste te COVI19",
    body: "Pas më shumë se dy muaj, sot kemi pase 0 raste pozitive me Covid-19. E asnjëherë nuk duhet të ndalemi të falenderojmë të gjithë ata që u angazhuan për këtë ❤️",
    createdDate: "01/05/2020",
    userId: 4,
    subredditId: 4,
  },
  {
    title: "Diasporë, po ju presim krahëhapur ❤️",
    body: "https://preview.redd.it/7fcivpesut051.jpg?width=960&crop=smart&auto=webp&s=a6669bef2cb1163c0a5e0208243f4ab22df4d80b",
    createdDate: "14/02/2020",
    userId: 2,
    subredditId: 4,
  },
  {
    title:
      "If everyone got to see 'life stats' after they died, what would be the first thing you would check?",
    body: "",
    createdDate: "22/02/2022",
    userId: 3,
    subredditId: 2,
  },
  {
    title: "What are some popular alcohol accompaniments from your country?",
    body: "https://preview.redd.it/qd1rt34gvkj81.jpg?width=640&crop=smart&auto=webp&s=2e2f9f6553e0b1c9b74961ef46bc730cc71a211a",
    createdDate: "14/02/2022",
    userId: 1,
    subredditId: 1,
  },
  {
    title: "Megathread: Russia-Ukraine Conflict",
    body: "So to keep things better organised and quite frankly make our job easier, we decided to open up a megathread regarding the current situation in the Ukraine. Please don't open up new posts regarding this topic because we will start to remove them, talk about and discuss this topic on this thread. PS: We'll try to add daily edits on this thread regarding breaking news etc. Cheers from the Mod-Team",
    createdDate: "23/02/2022",
    userId: 4,
    subredditId: 1,
  },
  {
    title:
      " Townsend On dfwticket, Mark Cuban says he believes Luka Doncic was humbled by criticism of his weight and not being l-Star starter, leading to change of diet and increased workouts. It finally clicked in that there s a level of discipline involved.",
    body: "On @dfwticket, Mark Cuban says he believes Luka Doncic was humbled by criticism of his weight and not being l-Star starter, leading to change of diet and increased workouts. It finally clicked in that there's a level of discipline involved.",
    createdDate: "22/02/2022",
    userId: 2,
    subredditId: 3,
  },
];
const comments = [
  {
    body: "Twitter: fat, Luka: >:(",
    upVotes: 4400,
    downVotes: 10,
    createdDate: "22/02/2022",
    userId: 1,
    postId: 7,
  },
  {
    body: "i hope i am too tall for conscription",
    upVotes: 5,
    downVotes: 10,
    createdDate: "23/02/2022",
    userId: 2,
    postId: 6,
  },
  {
    body: "Melon and white cheese(preferibly ezine) with raki",
    upVotes: 13,
    downVotes: 10,
    createdDate: "23/02/2022",
    userId: 4,
    postId: 5,
  },
  {
    body: "How many times I should've died and didn't, or 'near-deaths' that I was unaware of.",
    upVotes: 1300,
    downVotes: 10,
    createdDate: "22/02/2022",
    userId: 2,
    postId: 4,
  },
  {
    body: "I think there is a minimum limit for most armies but not a maximum limit, unless you want to become a tanker, submariner or a pilot. You'll fit right in the frontlines my friend :)",
    upVotes: 5,
    downVotes: 10,
    createdDate: "23/02/2022",
    userId: 3,
    postId: 6,
  },
  {
    body: "Bought the Annihilator, Lee Enfield, and MG08 skins (despite there being upcoming skins in R2BFV), the Company K skin will get me to use the Lee Enfield more for sure.",
    upVotes: 3,
    downVotes: 10,
    createdDate: "23/02/2022",
    userId: 4,
    postId: 1,
  },
  {
    body: "Finally one for the Annihilator, YES!",
    upVotes: 2,
    downVotes: 10,
    createdDate: "23/02/2022",
    userId: 2,
    postId: 1,
  },
];

db.exec(`
    DROP TABLE IF EXISTS userSubreddits;
    DROP TABLE IF EXISTS commentUpVotes;
    DROP TABLE IF EXISTS commentDownVotes;
    DROP TABLE IF EXISTS postsLikes;
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS subreddits;


    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    displayName TEXT NOT NULL
    );
  
    CREATE TABLE IF NOT EXISTS subreddits (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    background TEXT 
    );

    CREATE TABLE IF NOT EXISTS userSubreddits (
      id INTEGER PRIMARY KEY,
      dateJoined TEXT,
      userId INTEGER,
      subredditId INTEGER,
      FOREIGN KEY (userId) references users(id),
      FOREIGN KEY (subredditId) references subreddits(id)
    );

    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    createdDate TEXT NOT NULL,
    userId INTEGER NOT NULL,
    subredditId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits (id)
    );

    CREATE TABLE IF NOT EXISTS postsLikes (
      id INTEGER PRIMARY KEY,
      userId INTEGER,
      postId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (postId) REFERENCES posts(id)
    );
  
    CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    body TEXT NOT NULL,
    upVotes INTEGER,
    downVotes INTEGER,
    createdDate TEXT NOT NULL,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
    );

    CREATE TABLE IF NOT EXISTS commentUpVotes (
      id INTEGER PRIMARY KEY,
      userId INTEGER NOT NULL,
      commentId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (commentId) REFERENCES comments(id)
    );
    CREATE TABLE IF NOT EXISTS commentDownVotes (
      id INTEGER PRIMARY KEY,
      userId INTEGER NOT NULL,
      commentId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (commentId) REFERENCES comments(id)
    );
`);
const createUser = db.prepare(`
INSERT INTO users (name,email, password, displayName) VALUES (?,?,?,?);
`);
const createSubreddit = db.prepare(`
INSERT INTO subreddits (name, background) VALUES (?,?);
`);
const createPost = db.prepare(`
INSERT INTO posts (title, body, createdDate, userId, subredditId) VALUES (?,?,?,?,?);
`);
const createComment = db.prepare(`
INSERT INTO comments (body, upVotes, downVotes, createdDate, userId, postId) VALUES (?,?,?,?,?,?);
`);
for (const user of users) {
  createUser.run(user.name, user.email, user.password, user.displayName);
}
for (const subreddit of subreddits) {
  createSubreddit.run(subreddit.name, subreddit.background);
}

for (const post of posts) {
  createPost.run(
    post.title,
    post.body,
    post.createdDate,
    post.userId,
    post.subredditId
  );
}

for (const comment of comments) {
  createComment.run(
    comment.body,
    comment.upVotes,
    comment.downVotes,
    comment.createdDate,
    comment.userId,
    comment.postId
  );
}
