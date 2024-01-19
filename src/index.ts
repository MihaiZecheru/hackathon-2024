import express from "express";
import session from "express-session";
import favicon from "serve-favicon";
import path from "path";
import ejs from "ejs";

import { logged_in, login, logout } from "./modules/session";

const secret_key = "73c45ecdd6174653014f523d770d87be63673bece4e33452c77dcbf1bbedbdde";
const __PORT__: number = 3000;
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views');
// app.use(favicon(__dirname + '/static/icon.ico'));
app.use(session({ secret: secret_key, resave: true, saveUninitialized: true }));

app.use('/mdbootstrap/*', (req: any, res: any) => {
  return res.sendFile(path.resolve(__dirname + "/../" + req.originalUrl));
});

/**** Home ****/

app.get("/", (req: any, res: any) => {
  if (!logged_in(req)) return res.redirect('/login');
  res.render('home', { name: 'mihai christian zecheru' });
});

/**** User Login Routes ****/

app.get("/login", (req: any, res: any) => {
  res.render('login');
});

app.post("/login", (req: any, res: any) => {
  // Perform your authentication logic here
  
  login(req);
  res.redirect('/');
});

app.get("/register", (req: any, res: any) => {
  res.render('register');
});

app.get("/logout", (req: any, res: any) => {
  // Perform logout logic here
  logout(req);
  res.redirect('/');
});

/**** Routes ****/
import crypto from 'crypto';

// Generate a random secure key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

console.log('Generated Secret Key:', secretKey);
app.listen(__PORT__, () => console.log(`\nServer running @ http://localhost:${__PORT__}`));