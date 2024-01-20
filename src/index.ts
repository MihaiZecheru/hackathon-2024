import express from "express";
import session from "express-session";
import favicon from "serve-favicon";
import path from "path";
import ejs from "ejs";

import { logged_in, login, logout } from "./modules/session";

const user = {
  username: "admin",
  password: "admin"
}

const secret_key = "73c45ecdd6174653014f523d770d87be63673bece4e33452c77dcbf1bbedbdde";
const __PORT__: number = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views');
// app.use(favicon(__dirname + '/static/icon.ico'));
app.use(session({ secret: secret_key, resave: true, saveUninitialized: true }));

app.use(express.json());

app.use('/mdbootstrap/*', (req: any, res: any) => {
  return res.sendFile(path.resolve(__dirname + "/../" + req.originalUrl));
});

app.use('/src/modules/script.js', (req: any, res: any) => {
  return res.sendFile(path.resolve("src/modules/script.js"));
});

/**** Home ****/

app.get("/", (req: any, res: any) => {
  return res.render('home');
});

/**** User Login Routes ****/

app.post("/login", (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Get all users
  fetch(`https://lifetracker-mads-default-rtdb.firebaseio.com/users.json`)
    .then((res: any) => res.json())
    .then((data: any) => {
      data = Object.values(data);

      // Check if user exists
      let user_exists = false;
      data.forEach((user: any) => {
        if (user.username === username && user.password === password) {
          login(req);
          user_exists = true;
        }
      });

      if (user_exists) return res.status(200).send('Login successful');
      return res.status(200).send('Invalid username or password');
    });
});

app.get("/logout", (req: any, res: any) => {
  logout(req);
  return res.redirect('/');
});

app.get("/goal", async (req: any, res: any) => {
  const goals = await fetch(`https://lifetracker-mads-default-rtdb.firebaseio.com/goals.json`, {
    method: 'GET'
  }).then((res: any) => res.json())
  return res.render('goal', { sleep: goals.sleep, water: goals.water, steps: goals.steps, calories: goals.calories });
});

app.get("/food-picker", (req: any, res: any) => {
  res.render("calorie-inputer");
});

app.listen(__PORT__, () => console.log(`\nServer running @ http://localhost:${__PORT__}`));