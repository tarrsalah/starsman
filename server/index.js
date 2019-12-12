import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import { storeUser } from "./db.js";
import github from "./github.js";

const app = express();
const cache = new NodeCache();

dotenv.config();
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        await storeUser(profile);
        let user = { ...profile, accessToken };
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/api/user", async function(req, res) {
  if (!req.user) {
    res.status(403);
    return;
  }

  let user = req.user;
  let profile = {
    id: user.id,
    username: user.username
  };

  res.json(profile);
});

app.get("/api/starred", async function(req, res) {
  if (!req.user) {
    res.status(403);
    return;
  }

  const userId = req.user.id;
  const token = req.user.accessToken;
  const next = req.query.next;
  const cached = cache.get(userId);

  let response = {};

  if (!cached) {
    response = await github.getStarredRepos(token, 100, next);
  } else {
    if (cached.hasNextPage === false) {
      return res.json(cached);
    } else {
      let fetched = await github.getStarredRepos(token, 100, next);
      response = {
        repos: [...cached.repos, ...fetched.repos].filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj["id"]).indexOf(obj["id"]) === pos;
        }),
        hasNextPage: fetched.hasNextPage,
        endCursor: fetched.endCursor
      };
    }
  }

  await cache.set(userId, response);
  res.json(response);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(3000);
