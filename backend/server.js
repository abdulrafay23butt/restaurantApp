import express from 'express'
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js"
import login from "./Routes/auth/Login.js"
import signup from "./Routes/auth/Signup.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

app.listen(port, () => {
	console.log(`Server is listening from port ${port}.`);
    db();

});

app.use("/api/login",login);
app.use("/api/signup",signup);

