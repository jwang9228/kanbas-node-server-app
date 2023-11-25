import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import UserRoutes from "./users/routes.js";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";

process.env.DB_CONNECTION_STRING ? mongoose.connect(process.env.DB_CONNECTION_STRING, {dbName: 'kanbas'}) : mongoose.connect('mongodb://127.0.0.1:27017/kanbas')

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
);  
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(
  session(sessionOptions)
);
app.use(express.json());
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);