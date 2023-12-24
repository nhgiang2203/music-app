import express, { Express } from 'express';

import adminRoutes from './routes/admin/index.route';
import clientRoutes from './routes/client/index.route';
import { systemConfig } from './config/config';
import path from 'path';

import * as database from './config/database';
import dotenv from 'dotenv';
import flash from 'express-flash';
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from 'body-parser';
import methodOverride from 'method-override';


dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.POST || 3000;


//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Admin Router
adminRoutes(app);

//Client Router
clientRoutes(app);

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});