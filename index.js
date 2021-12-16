import express from "express";
import db from "./app/config/database.js";
import Routes from "./app/routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(8000, () => console.log('Server running at port 8000'));
